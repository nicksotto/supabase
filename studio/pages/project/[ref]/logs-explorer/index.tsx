import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Input, Modal, Form, Button } from '@supabase/ui'
import { useStore, withAuth } from 'hooks'
import CodeEditor from 'components/ui/CodeEditor'
import {
  DatePickerToFrom,
  LogsQueryPanel,
  LogsTableName,
  LogsWarning,
  LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD,
  LogTable,
  LogTemplate,
  TEMPLATES,
} from 'components/interfaces/Settings/Logs'
import { uuidv4 } from 'lib/helpers'
import useLogsQuery from 'hooks/analytics/useLogsQuery'
import { LogsExplorerLayout } from 'components/layouts'
import ShimmerLine from 'components/ui/ShimmerLine'
import LoadingOpacity from 'components/ui/LoadingOpacity'
import { UserContent } from 'types'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import UpgradePrompt from 'components/interfaces/Settings/Logs/UpgradePrompt'

export const LogsExplorerPage: NextPage = () => {
  const router = useRouter()
  const { ref, q, ite, its } = router.query
  const [editorId, setEditorId] = useState<string>(uuidv4())
  const [editorValue, setEditorValue] = useState<string>('')
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false)
  const [warnings, setWarnings] = useState<LogsWarning[]>([])
  const { content } = useStore()

  const [{ params, logData, error, isLoading }, { changeQuery, runQuery, setParams }] =
    useLogsQuery(ref as string, {
      iso_timestamp_start: (its || '') as string,
      iso_timestamp_end: (ite || '') as string,
    })

  useEffect(() => {
    // on mount, set initial values
    if (q) {
      onSelectTemplate({
        mode: 'custom',
        searchString: q as string,
      })
    }
  }, [])

  useEffect(() => {
    let newWarnings = []
    const start = params.iso_timestamp_start ? dayjs(params.iso_timestamp_start) : dayjs()
    const end = params.iso_timestamp_end ? dayjs(params.iso_timestamp_end) : dayjs()
    const daysDiff = Math.abs(start.diff(end, 'days'))
    if (
      editorValue &&
      !editorValue.includes('limit') &&
      daysDiff > LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD
    ) {
      newWarnings.push({ text: 'When querying large date ranges, include a LIMIT clause.' })
    }
    setWarnings(newWarnings)
  }, [editorValue, params.iso_timestamp_start, params.iso_timestamp_end])

  const onSelectTemplate = (template: LogTemplate) => {
    setEditorValue(template.searchString)
    changeQuery(template.searchString)
    setEditorId(uuidv4())
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: template.searchString },
    })
  }

  const handleRun = () => {
    changeQuery(editorValue)
    runQuery()
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: editorValue },
    })
  }

  const handleClear = () => {
    setEditorValue('')
    setEditorId(uuidv4())
    changeQuery('')
  }

  const handleInsertSource = (source: LogsTableName) => {
    setEditorValue((prev) => prev + source)
    setEditorId(uuidv4())
  }

  function handleOnSave() {
    setSaveModalOpen(!saveModalOpen)
  }

  const handleDateChange = ({ to, from }: DatePickerToFrom) => {
    setParams((prev) => ({
      ...prev,
      iso_timestamp_start: from || '',
      iso_timestamp_end: to || '',
    }))
    router.push({
      pathname: router.pathname,
      query: { ...router.query, its: from || '', ite: to || '' },
    })
  }

  return (
    <LogsExplorerLayout>
      <div className="h-full flex flex-col flex-grow gap-4">
        <div className="border rounded">
          <LogsQueryPanel
            defaultFrom={params.iso_timestamp_start || ''}
            defaultTo={params.iso_timestamp_end || ''}
            onDateChange={handleDateChange}
            onSelectSource={handleInsertSource}
            onClear={handleClear}
            onRun={handleRun}
            hasEditorValue={Boolean(editorValue)}
            templates={TEMPLATES.filter((template) => template.mode === 'custom')}
            onSelectTemplate={onSelectTemplate}
            onSave={handleOnSave}
            isLoading={isLoading}
            warnings={warnings}
          />

          <div className="min-h-[7rem] h-48">
            <ShimmerLine active={isLoading} />
            <CodeEditor
              id={editorId}
              language="pgsql"
              defaultValue={editorValue}
              onInputChange={(v) => setEditorValue(v || '')}
              onInputRun={handleRun}
            />
          </div>
        </div>
        <div className="flex flex-col flex-grow relative">
          <LoadingOpacity active={isLoading}>
            <div className="flex flex-grow h-full">
              <LogTable data={logData} error={error} />
            </div>
          </LoadingOpacity>
          <div className="flex flex-row justify-end mt-2">
            <UpgradePrompt projectRef={ref as string} from={params.iso_timestamp_start || ''} />
          </div>
        </div>
      </div>
      <Modal
        size="medium"
        onCancel={() => setSaveModalOpen(!saveModalOpen)}
        header="Save log query"
        visible={saveModalOpen}
        hideFooter
      >
        <Form
          initialValues={{
            name: '',
            desdcription: '',
          }}
          onSubmit={async (values: any, { setSubmitting }: any) => {
            setSubmitting(true)

            const payload: UserContent = {
              name: values.name,
              description: values.name,
              type: 'log_sql',
              content: {
                content_id: editorId,
                sql: editorValue,
                schema_version: '1',
                favorite: false,
              },
              visibility: 'user',
            }

            try {
              const { data: query, error } = await content.create(payload)
              if (error) throw error
              setSubmitting(false)
              setSaveModalOpen(false)
              toast.success(`Saved "${values.name}" log query`)
            } catch (error: any) {
              console.error(error)
              setSubmitting(false)
              setSaveModalOpen(false)
              toast.error(error.message)
            }
          }}
        >
          {({ isSubmitting }: any) => (
            <>
              <div className="py-4">
                <Modal.Content>
                  <div className="space-y-6">
                    <Input layout="horizontal" label="Name" id="name" />
                    <Input.TextArea
                      layout="horizontal"
                      labelOptional="Optional"
                      label="Description"
                      id="description"
                      rows={2}
                    />
                  </div>
                </Modal.Content>
              </div>
              <div className="bg-scale-300 py-3 border-t">
                <Modal.Content>
                  <div className="flex gap-2 items-center justify-end">
                    <Button size="tiny" type="default">
                      Cancel
                    </Button>
                    <Button size="tiny" loading={isSubmitting}>
                      Save
                    </Button>
                  </div>
                </Modal.Content>
              </div>
            </>
          )}
        </Form>
      </Modal>
    </LogsExplorerLayout>
  )
}

export default withAuth(observer(LogsExplorerPage))
