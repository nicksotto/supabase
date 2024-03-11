import { type GetStaticPaths, type GetStaticProps, type InferGetStaticPropsType } from 'next'
import { MDXRemote } from 'next-mdx-remote'

import components from '~/components'
import { MenuId } from '~/components/Navigation/NavigationMenu/NavigationMenu'
import { NavMenuProvider } from '~/components/Navigation/NavigationMenu/NavigationMenuContext'
import Layout from '~/layouts/DefaultGuideLayout'
import { getGuidesStaticPaths, getGuidesStaticProps } from '~/lib/docs'

export const getStaticPaths = (async () => {
  return getGuidesStaticPaths('resources')
}) satisfies GetStaticPaths

export const getStaticProps = (async (args) => {
  return getGuidesStaticProps('resources', args)
}) satisfies GetStaticProps

export default function ResourcesGuide({
  frontmatter,
  mdxSource,
  editLink,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { hideToc, ...meta } = frontmatter

  return (
    <NavMenuProvider menuId={MenuId.Resources}>
      <Layout meta={meta} hideToc={hideToc} editLink={editLink}>
        <MDXRemote {...mdxSource} components={components} />
      </Layout>
    </NavMenuProvider>
  )
}
