import memoize from 'memoize-one'
import { CSSProperties, ReactNode, memo, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, areEqual } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

import ShimmeringLoader from 'components/ui/ShimmeringLoader'
import { propsAreEqual } from 'lib/helpers'

/**
 * Note that the loading more logic of this component works best with a cursor-based
 * pagination API such that each payload response from the API returns a structure like
 * { cursor, items, hasNext, hasPrevious }
 */

const createItemData = memoize((items, itemProps) => ({ items, ...itemProps }))

export interface ItemProps {
  data: any
  listRef: any
  index: number
  style: CSSProperties
  LoaderComponent?: ReactNode
}

export interface InfiniteListProps<T> {
  items?: T[]
  itemProps?: any
  hasNextPage?: boolean
  isLoadingNextPage?: boolean
  getItemSize?: (index: number) => number
  onLoadNextPage?: () => void
  ItemComponent?: any
  LoaderComponent?: ReactNode
}

// eslint-disable-next-line react/display-name
const Item = memo(({ listRef, LoaderComponent, data, index, style }: ItemProps) => {
  const { items, itemProps, ItemComponent } = data
  const item = index < items.length ? items[index] : undefined

  return item ? (
    <div style={style}>
      <ItemComponent index={index} item={item} listRef={listRef} {...itemProps} />
    </div>
  ) : LoaderComponent !== undefined ? (
    <div style={style}>{LoaderComponent}</div>
  ) : (
    <div className="space-y-1 my-1" style={style}>
      <ShimmeringLoader />
      <ShimmeringLoader />
      <ShimmeringLoader />
    </div>
  )
}, areEqual)

function InfiniteList<T>({
  items = [],
  itemProps = {},
  hasNextPage = false,
  isLoadingNextPage = false,
  getItemSize = () => 40,
  onLoadNextPage = () => {},
  ItemComponent = () => null,
  LoaderComponent,
}: InfiniteListProps<T>) {
  const listRef = useRef<any>()

  // Only load 1 page of items at a time
  // Pass an empty callback to InfiniteLoader in case it asks to load more than once
  const loadMoreItems = isLoadingNextPage ? () => {} : onLoadNextPage

  // Every row is loaded except for our loading indicator row
  const isItemLoaded = (index: number) => {
    return !hasNextPage || index < items.length
  }

  const itemCount = hasNextPage ? items.length + 1 : items.length
  const itemData = createItemData(items, { itemProps, ItemComponent })

  return (
    <div className="relative flex flex-col flex-grow">
      <div className="flex-grow">
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <InfiniteLoader
              itemCount={itemCount}
              isItemLoaded={isItemLoaded}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <VariableSizeList
                  ref={(refy) => {
                    ref(refy)
                    listRef.current = refy
                  }}
                  height={height ?? 0}
                  width={width ?? 0}
                  itemCount={itemCount}
                  itemData={itemData}
                  itemSize={getItemSize}
                  onItemsRendered={onItemsRendered}
                >
                  {(props) => (
                    <Item listRef={listRef} LoaderComponent={LoaderComponent} {...props} />
                  )}
                </VariableSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          pointerEvents: 'none', //https://github.com/bvaughn/react-window/issues/455
        }}
      />
    </div>
  )
}

export default memo(InfiniteList, propsAreEqual)
