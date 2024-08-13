// see apps/www/components/LaunchWeek/X/Releases/data/lwx_advent_days.tsx for reference

import { ReactNode } from 'react'
import { type ClassValue } from 'clsx'

export interface AdventDay {
  icon?: ReactNode // use svg jsx with 34x34px viewport
  className?: ClassValue | string
  id: string
  title: string
  description?: string
  is_shipped: boolean
  links: AdventLink[]
  icons?: AdventLink[]
  type?: string
}

export interface AdventLink {
  url: string
  label?: string
  icon?: any
  target?: '_blank'
}

export const days: AdventDay[] = [
  {
    title: 'GitHub Copilot',
    description: 'Database Migrations for VS Code',
    id: 'github-copilot',
    is_shipped: true,
    links: [
      {
        url: '/blog/github-copilot-extension-for-vs-code',
        label: 'Blog post',
        target: '_blank',
      },
    ],
    icon: (
      <svg
        width="50"
        height="51"
        viewBox="0 0 50 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.7479 40.9242C14.6856 40.9242 7.38264 34.4969 7.10693 32.6552V28.3586C7.29442 26.9734 8.60017 24.6398 10.6095 23.8039C10.6382 23.6495 10.6625 23.4885 10.6889 23.323C10.7529 22.9194 10.8213 22.4761 10.9668 21.9732C10.5235 20.8527 10.4066 19.5822 10.4066 18.3206C10.4066 16.4017 10.6889 14.4188 11.9351 12.8417C13.2122 11.225 15.2304 10.3625 17.9434 10.0604C20.6034 9.7648 22.9326 10.1354 24.4369 11.7477C24.5471 11.8646 24.6486 11.9859 24.7434 12.1116C24.8405 11.9859 24.9508 11.8646 25.0589 11.7477C26.5631 10.1354 28.8923 9.7648 31.5523 10.0604C34.2653 10.3625 36.2835 11.225 37.5606 12.8417C38.809 14.4188 39.0891 16.4017 39.0891 18.3206C39.0891 19.5822 38.9722 20.8527 38.5289 21.9732C38.6744 22.4761 38.745 22.9194 38.8068 23.323C38.8332 23.4907 38.8597 23.6495 38.8884 23.8039C40.9264 24.653 42.2454 27.0484 42.3976 28.4247V32.5537C42.3976 34.2433 35.0064 40.9242 24.7479 40.9242ZM24.7479 37.6488C29.7768 37.6488 34.8586 35.2005 35.7806 34.4881V25.103L35.7299 24.8471C34.6491 25.3103 33.3588 25.489 31.9207 25.489C29.393 25.489 27.3792 24.7677 25.9433 23.3032C25.4701 22.8166 25.069 22.2647 24.7523 21.6644C24.4324 22.265 24.0283 22.8168 23.5524 23.3032C22.1187 24.7677 20.1049 25.489 17.575 25.489C16.1369 25.489 14.8488 25.3103 13.7658 24.8471L13.7151 25.103V34.4881C14.6393 35.2005 19.7189 37.6488 24.7479 37.6488ZM22.0216 14.0041C21.596 13.5497 20.6166 13.0932 18.3117 13.349C16.0641 13.5983 15.0495 14.2401 14.5334 14.893C13.9886 15.5811 13.7195 16.6332 13.7195 18.3206C13.7195 20.0697 14.0041 20.9034 14.3989 21.3446C14.7562 21.7438 15.5436 22.1805 17.5794 22.1805C19.4609 22.1805 20.5328 21.6622 21.1923 20.9894C21.8871 20.2792 22.3547 19.1654 22.5532 17.564C22.8113 15.5017 22.4716 14.4871 22.0216 14.0041ZM31.1862 13.349C28.8835 13.0932 27.9042 13.5497 27.4785 14.0041C27.0285 14.4871 26.6866 15.5017 26.9447 17.564C27.1454 19.1654 27.613 20.2792 28.3078 20.9894C28.9673 21.6622 30.037 22.1805 31.9207 22.1805C33.9543 22.1805 34.7439 21.7438 35.1013 21.3446C35.4961 20.9034 35.7806 20.0697 35.7806 18.3206C35.7806 16.6332 35.5093 15.5811 34.9645 14.893C34.4506 14.2401 33.436 13.5983 31.1862 13.349Z"
          fill="hsl(var(--foreground-light))"
        />
        <path
          d="M20.8923 27.6947C21.3311 27.6947 21.7518 27.869 22.0621 28.1792C22.3723 28.4894 22.5466 28.9102 22.5466 29.3489V32.6596C22.5466 33.0984 22.3723 33.5191 22.0621 33.8293C21.7518 34.1396 21.3311 34.3139 20.8923 34.3139C20.4536 34.3139 20.0328 34.1396 19.7226 33.8293C19.4124 33.5191 19.2381 33.0984 19.2381 32.6596V29.3489C19.2381 28.9102 19.4124 28.4894 19.7226 28.1792C20.0328 27.869 20.4536 27.6947 20.8923 27.6947ZM30.2664 29.3489V32.6596C30.2664 33.0984 30.0921 33.5191 29.7819 33.8293C29.4717 34.1396 29.0509 34.3139 28.6122 34.3139C28.1734 34.3139 27.7527 34.1396 27.4425 33.8293C27.1322 33.5191 26.9579 33.0984 26.9579 32.6596V29.3489C26.9579 28.9102 27.1322 28.4894 27.4425 28.1792C27.7527 27.869 28.1734 27.6947 28.6122 27.6947C29.0509 27.6947 29.4717 27.869 29.7819 28.1792C30.0921 28.4894 30.2664 28.9102 30.2664 29.3489Z"
          fill="hsl(var(--foreground-light))"
        />
      </svg>
    ),
  },
  {
    title: 'pg_replicate',
    description: 'Build Postgres replication applications in Rust',
    id: 'pgreplicate',
    is_shipped: true,
    links: [
      {
        url: 'https://news.ycombinator.com/item?id=41209994',
        label: 'Hacker News',
        target: '_blank',
      },
    ],
    icon: (
      <svg
        width="50"
        height="51"
        viewBox="0 0 50 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.7774 8.26382C15.182 8.26382 7.3724 16.0771 7.3724 25.6688C7.3724 35.2605 15.1857 43.0738 24.7774 43.0738C34.3691 43.0738 42.1824 35.2605 42.1824 25.6688C42.1824 16.0771 34.3691 8.26382 24.7774 8.26382ZM24.7516 9.81028C25.0492 9.81799 25.332 9.94203 25.5398 10.1559C25.7475 10.3699 25.8637 10.6567 25.8636 10.9554C25.8636 11.2591 25.743 11.5504 25.5282 11.7651C25.3135 11.9799 25.0222 12.1005 24.7185 12.1005C24.4148 12.1005 24.1235 11.9799 23.9088 11.7651C23.694 11.5504 23.5734 11.2591 23.5734 10.9554C23.5733 10.8022 23.604 10.6505 23.6636 10.5094C23.7232 10.3682 23.8105 10.2405 23.9204 10.1337C24.0303 10.027 24.1605 9.94331 24.3032 9.88775C24.446 9.83219 24.5985 9.80585 24.7516 9.81028ZM27.3732 11.6955C29.3835 12.072 31.2877 12.8816 32.9536 14.0681C34.6195 15.2546 36.0072 16.7895 37.0202 18.5662L35.6689 21.6149C35.4369 22.1414 35.6762 22.76 36.1991 22.9957L38.7986 24.1481C38.8792 24.9607 38.8891 25.7787 38.8281 26.593H37.381C37.2374 26.593 37.1785 26.6887 37.1785 26.8287V27.4914C37.1785 29.0526 36.2985 29.395 35.5253 29.4797C34.7889 29.5644 33.9751 29.1704 33.872 28.7212C33.4376 26.28 32.7159 25.7609 31.5745 24.8588C32.992 23.9604 34.4649 22.6311 34.4649 20.8564C34.4649 18.9381 33.1504 17.7303 32.2556 17.1375C30.9964 16.3091 29.6046 16.1434 29.229 16.1434H14.2799C16.347 13.8342 19.1178 12.2708 22.1632 11.6955L23.9269 13.5439C24.3245 13.9599 24.9836 13.9783 25.3997 13.577L27.3732 11.6955ZM11.0986 20.1715C11.3966 20.1802 11.6794 20.3046 11.887 20.5184C12.0946 20.7323 12.2107 21.0186 12.2106 21.3167C12.2106 21.6204 12.09 21.9116 11.8752 22.1264C11.6605 22.3411 11.3692 22.4618 11.0655 22.4618C10.7618 22.4618 10.4705 22.3411 10.2558 22.1264C10.041 21.9116 9.92037 21.6204 9.92037 21.3167C9.92031 21.1634 9.95099 21.0118 10.0106 20.8706C10.0702 20.7295 10.1575 20.6018 10.2674 20.495C10.3773 20.3882 10.5074 20.3046 10.6502 20.249C10.793 20.1934 10.9455 20.1671 11.0986 20.1715ZM38.401 20.2231C38.6989 20.2317 38.9817 20.3562 39.1893 20.57C39.397 20.7838 39.5131 21.0702 39.5129 21.3682C39.5129 21.6719 39.3923 21.9632 39.1775 22.1779C38.9628 22.3927 38.6715 22.5133 38.3678 22.5133C38.0641 22.5133 37.7728 22.3927 37.5581 22.1779C37.3433 21.9632 37.2227 21.6719 37.2227 21.3682C37.2226 21.215 37.2533 21.0633 37.3129 20.9222C37.3725 20.7811 37.4599 20.6533 37.5697 20.5465C37.6796 20.4398 37.8098 20.3561 37.9526 20.3006C38.0953 20.245 38.2478 20.2187 38.401 20.2231ZM13.2563 20.4072H15.252V29.4061H11.2238C10.7263 27.6591 10.5713 25.8325 10.7672 24.0266L13.2342 22.9294C13.7607 22.6937 14.0001 22.0788 13.7644 21.5523L13.2563 20.4072ZM21.5851 20.5029H26.3386C26.5853 20.5029 28.0728 20.7864 28.0728 21.9021C28.0728 22.8263 26.9314 23.1577 25.9925 23.1577H21.5814L21.5851 20.5029ZM21.5851 26.9686H25.2266C25.558 26.9686 27.005 27.0643 27.4653 28.9127C27.6089 29.4797 27.9292 31.3281 28.1465 31.9209C28.3637 32.5837 29.2437 33.9092 30.1826 33.9092H36.1255C35.7272 34.4426 35.2916 34.9471 34.822 35.4189L32.4029 34.8997C31.8396 34.7782 31.2836 35.139 31.1621 35.7024L30.5877 38.3829C28.7406 39.2196 26.7347 39.6478 24.7069 39.6383C22.6792 39.6288 20.6774 39.1817 18.8383 38.3277L18.2639 35.6472C18.1424 35.0838 17.5901 34.723 17.0267 34.8445L14.6592 35.3526C14.2198 34.8994 13.8114 34.4172 13.4367 33.9092H24.9505C25.0793 33.9092 25.1677 33.8871 25.1677 33.7656V29.6933C25.1677 29.5755 25.0793 29.5497 24.9505 29.5497H21.5814L21.5851 26.9686ZM16.2719 36.2952C16.5698 36.3038 16.8526 36.4283 17.0603 36.6421C17.2679 36.8559 17.384 37.1423 17.3839 37.4403C17.3839 37.744 17.2632 38.0353 17.0485 38.25C16.8337 38.4648 16.5425 38.5854 16.2388 38.5854C15.9351 38.5854 15.6438 38.4648 15.429 38.25C15.2143 38.0353 15.0936 37.744 15.0936 37.4403C15.0936 37.2871 15.1243 37.1354 15.1839 36.9943C15.2435 36.8532 15.3308 36.7254 15.4407 36.6186C15.5505 36.5119 15.6807 36.4282 15.8235 36.3727C15.9663 36.3171 16.1187 36.2908 16.2719 36.2952ZM33.2277 36.3467C33.5256 36.3554 33.8084 36.4798 34.0161 36.6936C34.2237 36.9075 34.3398 37.1938 34.3397 37.4918C34.3397 37.7956 34.219 38.0868 34.0043 38.3016C33.7895 38.5163 33.4983 38.637 33.1946 38.637C32.8908 38.637 32.5996 38.5163 32.3848 38.3016C32.1701 38.0868 32.0494 37.7956 32.0494 37.4918C32.0494 37.3386 32.0801 37.187 32.1397 37.0458C32.1993 36.9047 32.2866 36.777 32.3965 36.6702C32.5063 36.5634 32.6365 36.4798 32.7793 36.4242C32.9221 36.3686 33.0745 36.3423 33.2277 36.3467Z"
          fill="hsl(var(--foreground-light))"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M41.2102 25.6688C41.2102 30.0271 39.4789 34.2069 36.3971 37.2887C33.3153 40.3705 29.1355 42.1018 24.7772 42.1018C20.4189 42.1018 16.2392 40.3705 13.1574 37.2887C10.0756 34.2069 8.34429 30.0271 8.34429 25.6688C8.34429 21.3105 10.0756 17.1308 13.1574 14.049C16.2392 10.9672 20.4189 9.23589 24.7772 9.23589C29.1355 9.23589 33.3153 10.9672 36.3971 14.049C39.4789 17.1308 41.2102 21.3105 41.2102 25.6688ZM40.9009 24.0819L43.4636 25.6688L40.9009 27.2558L43.1027 29.314L40.2823 30.3708L42.0423 32.8194L39.0635 33.3054L40.3154 36.0522L37.2998 35.9454L37.9921 38.8837L35.0538 38.1914L35.1606 41.207L32.4138 39.9551L31.9278 42.9339L29.4792 41.1739L28.4225 43.9943L26.3642 41.7925L24.7772 44.3552L23.1903 41.7925L21.132 43.9943L20.0753 41.1739L17.6267 42.9339L17.1407 39.9551L14.3939 41.207L14.5007 38.1914L11.5624 38.8837L12.2546 35.9454L9.23902 36.0522L10.4909 33.3054L7.51215 32.8194L9.27216 30.3708L6.45172 29.314L8.65358 27.2558L6.09088 25.6688L8.65358 24.0819L6.45172 22.0236L9.27216 20.9669L7.51215 18.5183L10.4909 18.0323L9.23902 15.2855L12.2546 15.3923L11.5624 12.454L14.5007 13.1462L14.3939 10.1306L17.1407 11.3825L17.6267 8.40375L20.0753 10.1638L21.132 7.34332L23.1903 9.54518L24.7772 6.98248L26.3642 9.54518L28.4225 7.34332L29.4792 10.1638L31.9278 8.40375L32.4138 11.3825L35.1606 10.1306L35.0538 13.1462L37.9921 12.454L37.2998 15.3923L40.3154 15.2855L39.0635 18.0323L42.0423 18.5183L40.2823 20.9669L43.1027 22.0236L40.9009 24.0819Z"
          fill="hsl(var(--foreground-light))"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.7772 6.43018C24.9685 6.43018 25.1461 6.52911 25.2468 6.6917L26.4537 8.64065L28.019 6.96616C28.1495 6.82654 28.3429 6.76432 28.5303 6.80166C28.7178 6.83899 28.8726 6.97057 28.9396 7.14954L29.7431 9.2939L31.6054 7.95528C31.7607 7.84368 31.9626 7.82032 32.1392 7.89353C32.3159 7.96674 32.4421 8.1261 32.4729 8.31481L32.8425 10.5802L34.9315 9.62806C35.1057 9.5487 35.3084 9.56512 35.4675 9.67147C35.6266 9.77782 35.7193 9.95893 35.7125 10.1502L35.6314 12.4427L37.8654 11.9164C38.0517 11.8725 38.2473 11.9282 38.3826 12.0635C38.5179 12.1987 38.5735 12.3944 38.5297 12.5806L38.0033 14.8147L40.2959 14.7335C40.4871 14.7267 40.6682 14.8194 40.7746 14.9785C40.8809 15.1376 40.8974 15.3404 40.818 15.5145L39.8659 17.6036L42.1313 17.9732C42.32 18.004 42.4793 18.1302 42.5525 18.3068C42.6257 18.4835 42.6024 18.6854 42.4908 18.8407L41.1522 20.703L43.2965 21.5064C43.4755 21.5735 43.6071 21.7283 43.6444 21.9157C43.6817 22.1032 43.6195 22.2966 43.4799 22.4271L41.8054 23.9924L43.7544 25.1993C43.917 25.3 44.0159 25.4776 44.0159 25.6688C44.0159 25.8601 43.917 26.0377 43.7544 26.1384L41.8054 27.3453L43.4799 28.9106C43.6195 29.0411 43.6817 29.2345 43.6444 29.4219C43.6071 29.6094 43.4755 29.7642 43.2965 29.8312L41.1522 30.6347L42.4908 32.497C42.6024 32.6522 42.6257 32.8542 42.5525 33.0308C42.4793 33.2075 42.32 33.3337 42.1313 33.3644L39.8659 33.7341L40.818 35.8231C40.8974 35.9973 40.8809 36.2 40.7746 36.3591C40.6682 36.5182 40.4871 36.6109 40.2959 36.6041L38.0033 36.523L38.5297 38.757C38.5735 38.9432 38.5179 39.1389 38.3826 39.2742C38.2473 39.4095 38.0517 39.4651 37.8654 39.4213L35.6314 38.8949L35.7125 41.1875C35.7193 41.3787 35.6266 41.5598 35.4675 41.6662C35.3085 41.7725 35.1057 41.789 34.9315 41.7096L32.8425 40.7575L32.4729 43.0229C32.4421 43.2116 32.3159 43.3709 32.1392 43.4441C31.9626 43.5173 31.7607 43.494 31.6054 43.3824L29.7431 42.0438L28.9396 44.1881C28.8726 44.3671 28.7178 44.4987 28.5303 44.536C28.3429 44.5733 28.1495 44.5111 28.019 44.3715L26.4537 42.697L25.2468 44.646C25.1461 44.8086 24.9685 44.9075 24.7772 44.9075C24.586 44.9075 24.4084 44.8086 24.3077 44.646L23.1008 42.697L21.5355 44.3715C21.405 44.5111 21.2116 44.5733 21.0241 44.536C20.8367 44.4987 20.6819 44.3671 20.6148 44.1881L19.8114 42.0438L17.9491 43.3824C17.7938 43.494 17.5919 43.5173 17.4152 43.4441C17.2386 43.3709 17.1124 43.2116 17.0816 43.0229L16.712 40.7575L14.6229 41.7096C14.4488 41.789 14.246 41.7725 14.0869 41.6662C13.9278 41.5598 13.8351 41.3787 13.8419 41.1875L13.9231 38.8949L11.689 39.4213C11.5028 39.4651 11.3071 39.4095 11.1719 39.2742C11.0366 39.1389 10.9809 38.9432 11.0248 38.757L11.5511 36.523L9.25857 36.6041C9.06733 36.6109 8.88622 36.5182 8.77987 36.3591C8.67352 36.2 8.6571 35.9973 8.73645 35.8231L9.68857 33.7341L7.42321 33.3644C7.2345 33.3337 7.07514 33.2075 7.00193 33.0308C6.92872 32.8542 6.95208 32.6522 7.06368 32.497L8.4023 30.6347L6.25794 29.8312C6.07897 29.7642 5.94739 29.6094 5.91006 29.4219C5.87272 29.2345 5.93494 29.0411 6.07456 28.9106L7.74905 27.3453L5.8001 26.1384C5.63751 26.0377 5.53857 25.8601 5.53857 25.6688C5.53857 25.4776 5.63751 25.3 5.8001 25.1993L7.74905 23.9924L6.07456 22.4271C5.93494 22.2966 5.87272 22.1032 5.91006 21.9157C5.94739 21.7283 6.07897 21.5735 6.25794 21.5064L8.4023 20.703L7.06368 18.8407C6.95208 18.6854 6.92872 18.4835 7.00193 18.3068C7.07514 18.1302 7.2345 18.004 7.42321 17.9732L9.68857 17.6036L8.73645 15.5145C8.6571 15.3404 8.67352 15.1376 8.77987 14.9785C8.88622 14.8194 9.06733 14.7267 9.25857 14.7335L11.5511 14.8147L11.0248 12.5806C10.9809 12.3944 11.0366 12.1987 11.1719 12.0635C11.3071 11.9282 11.5028 11.8725 11.689 11.9164L13.9231 12.4427L13.8419 10.1502C13.8351 9.95893 13.9278 9.77782 14.0869 9.67147C14.246 9.56512 14.4488 9.5487 14.6229 9.62806L16.712 10.5802L17.0816 8.31481C17.1124 8.1261 17.2386 7.96674 17.4152 7.89353C17.5919 7.82032 17.7938 7.84368 17.9491 7.95528L19.8114 9.2939L20.6148 7.14954C20.6819 6.97057 20.8367 6.83899 21.0241 6.80166C21.2116 6.76432 21.405 6.82654 21.5355 6.96616L23.1008 8.64065L24.3077 6.6917C24.4084 6.52911 24.586 6.43018 24.7772 6.43018ZM21.864 8.9352L21.3367 8.3711L21.0659 9.09395C21.3303 9.03473 21.5965 8.98179 21.864 8.9352ZM19.745 10.6066L19.7529 10.6122C19.8926 10.7126 20.071 10.7422 20.2356 10.6923C20.4002 10.6424 20.5321 10.5186 20.5925 10.3575L20.5958 10.3485C21.3102 10.1535 22.0397 10.0081 22.7793 9.91432L22.7868 9.92234C22.9042 10.048 23.0735 10.1117 23.2447 10.0948C23.4158 10.0779 23.5693 9.98218 23.6598 9.83596L23.6653 9.82714C24.0342 9.80126 24.405 9.7882 24.7772 9.7882C25.1494 9.7882 25.5203 9.80126 25.8892 9.82714L25.8946 9.83596C25.9852 9.98218 26.1387 10.0779 26.3098 10.0948C26.481 10.1117 26.6502 10.048 26.7677 9.92234L26.7752 9.91431C27.5147 10.0081 28.2443 10.1535 28.9586 10.3485L28.962 10.3575C29.0223 10.5186 29.1543 10.6424 29.3189 10.6923C29.4834 10.7422 29.6619 10.7126 29.8016 10.6122L29.8094 10.6066C30.5142 10.842 31.2016 11.1267 31.8666 11.4584L31.8687 11.4715C31.8964 11.6413 32.0017 11.7885 32.1535 11.8697C32.3053 11.9508 32.4862 11.9565 32.6428 11.8851L32.6547 11.8797C33.2965 12.2463 33.9141 12.6585 34.5023 13.1142L34.5018 13.1267C34.4958 13.2988 34.5703 13.4638 34.7033 13.5731C34.8364 13.6823 35.0129 13.7233 35.1805 13.6838L35.1928 13.6809C35.4719 13.9234 35.7434 14.1764 36.0065 14.4395C36.2697 14.7027 36.5227 14.9741 36.7652 15.2532L36.7623 15.2656C36.7228 15.4332 36.7637 15.6096 36.873 15.7427C36.9822 15.8758 37.1473 15.9503 37.3194 15.9442L37.3319 15.9438C37.7876 16.532 38.1998 17.1496 38.5664 17.7913L38.561 17.8032C38.4896 17.9598 38.4953 18.1408 38.5764 18.2926C38.6575 18.4444 38.8047 18.5497 38.9746 18.5774L38.9877 18.5795C39.3194 19.2444 39.604 19.9319 39.8395 20.6366L39.8338 20.6445C39.7334 20.7842 39.7039 20.9626 39.7538 21.1272C39.8037 21.2918 39.9275 21.4237 40.0885 21.4841L40.0975 21.4874C40.2925 22.2018 40.438 22.9313 40.5317 23.6709L40.5237 23.6784C40.3981 23.7958 40.3343 23.9651 40.3513 24.1363C40.3682 24.3074 40.4639 24.4609 40.6101 24.5514L40.6189 24.5569C40.6448 24.9258 40.6579 25.2966 40.6579 25.6688C40.6579 26.041 40.6448 26.4119 40.6189 26.7808L40.6101 26.7862C40.4639 26.8768 40.3682 27.0303 40.3513 27.2014C40.3343 27.3726 40.3981 27.5418 40.5237 27.6593L40.5317 27.6668C40.438 28.4063 40.2925 29.1358 40.0975 29.8502L40.0885 29.8536C39.9275 29.9139 39.8037 30.0459 39.7538 30.2105C39.7039 30.375 39.7334 30.5535 39.8338 30.6932L39.8395 30.701C39.604 31.4058 39.3194 32.0932 38.9877 32.7582L38.9746 32.7603C38.8047 32.788 38.6575 32.8933 38.5764 33.0451C38.4953 33.1969 38.4896 33.3778 38.561 33.5344L38.5664 33.5463C38.1998 34.1881 37.7876 34.8057 37.3319 35.3939L37.3194 35.3934C37.1473 35.3874 36.9822 35.4619 36.873 35.5949C36.7637 35.728 36.7228 35.9045 36.7623 36.0721L36.7652 36.0844C36.5227 36.3635 36.2697 36.635 36.0065 36.8981C35.7434 37.1613 35.472 37.4143 35.1928 37.6568L35.1805 37.6539C35.0129 37.6144 34.8364 37.6553 34.7033 37.7646C34.5703 37.8738 34.4958 38.0389 34.5018 38.211L34.5023 38.2235C33.9141 38.6792 33.2965 39.0914 32.6547 39.458L32.6428 39.4526C32.4862 39.3812 32.3053 39.3869 32.1535 39.468C32.0017 39.5491 31.8964 39.6963 31.8687 39.8662L31.8666 39.8793C31.2016 40.211 30.5142 40.4956 29.8094 40.7311L29.8016 40.7254C29.6619 40.625 29.4834 40.5955 29.3189 40.6454C29.1543 40.6953 29.0223 40.8191 28.962 40.9801L28.9586 40.9891C28.2442 41.1841 27.5147 41.3296 26.7752 41.4233L26.7677 41.4153C26.6502 41.2897 26.481 41.2259 26.3098 41.2429C26.1387 41.2598 25.9852 41.3555 25.8946 41.5017L25.8892 41.5105C25.5203 41.5364 25.1494 41.5495 24.7772 41.5495C24.405 41.5495 24.0342 41.5364 23.6653 41.5105L23.6598 41.5017C23.5693 41.3555 23.4158 41.2598 23.2447 41.2429C23.0735 41.2259 22.9042 41.2897 22.7868 41.4153L22.7793 41.4233C22.0397 41.3296 21.3102 41.1841 20.5958 40.9891L20.5925 40.9801C20.5321 40.8191 20.4002 40.6953 20.2356 40.6454C20.071 40.5955 19.8926 40.625 19.7529 40.7254L19.745 40.7311C19.0403 40.4956 18.3528 40.211 17.6879 39.8793L17.6858 39.8662C17.6581 39.6963 17.5528 39.5491 17.401 39.468C17.2492 39.3869 17.0682 39.3812 16.9116 39.4526L16.8997 39.458C16.258 39.0914 15.6404 38.6792 15.0522 38.2235L15.0526 38.211C15.0587 38.0389 14.9842 37.8738 14.8511 37.7646C14.718 37.6553 14.5416 37.6144 14.374 37.6539L14.3616 37.6568C14.0825 37.4143 13.8111 37.1613 13.5479 36.8981C13.2848 36.635 13.0318 36.3635 12.7893 36.0844L12.7922 36.0721C12.8317 35.9045 12.7907 35.728 12.6815 35.5949C12.5722 35.4619 12.4072 35.3874 12.2351 35.3934L12.2226 35.3939C11.7669 34.8057 11.3547 34.1881 10.9881 33.5463L10.9935 33.5344C11.0649 33.3778 11.0592 33.1969 10.9781 33.0451C10.8969 32.8933 10.7497 32.788 10.5799 32.7603L10.5668 32.7582C10.2351 32.0932 9.95044 31.4058 9.71496 30.701L9.72063 30.6932C9.82102 30.5535 9.85061 30.375 9.80068 30.2105C9.75075 30.0459 9.627 29.9139 9.46594 29.8536L9.45692 29.8502C9.26193 29.1358 9.11649 28.4063 9.02271 27.6668L9.03074 27.6593C9.15638 27.5418 9.22014 27.3726 9.2032 27.2014C9.18627 27.0303 9.09058 26.8768 8.94436 26.7862L8.93554 26.7808C8.90966 26.4119 8.89659 26.041 8.89659 25.6688C8.89659 25.2966 8.90966 24.9258 8.93554 24.5569L8.94436 24.5514C9.09058 24.4609 9.18627 24.3074 9.2032 24.1363C9.22014 23.9651 9.15638 23.7958 9.03074 23.6784L9.02271 23.6709C9.11649 22.9313 9.26193 22.2018 9.45692 21.4874L9.46594 21.4841C9.627 21.4237 9.75075 21.2918 9.80068 21.1272C9.85061 20.9626 9.82102 20.7842 9.72063 20.6445L9.71496 20.6366C9.95044 19.9319 10.2351 19.2444 10.5668 18.5795L10.5799 18.5774C10.7497 18.5497 10.8969 18.4444 10.9781 18.2926C11.0592 18.1408 11.0649 17.9598 10.9935 17.8032L10.9881 17.7913C11.3547 17.1496 11.7669 16.532 12.2226 15.9438L12.2351 15.9442C12.4072 15.9503 12.5722 15.8758 12.6815 15.7427C12.7907 15.6096 12.8317 15.4332 12.7922 15.2656L12.7893 15.2532C13.0318 14.9741 13.2848 14.7027 13.5479 14.4395C13.8111 14.1764 14.0825 13.9234 14.3616 13.6809L14.374 13.6838C14.5416 13.7233 14.718 13.6823 14.8511 13.5731C14.9842 13.4638 15.0587 13.2988 15.0526 13.1267L15.0522 13.1142C15.6404 12.6585 16.258 12.2463 16.8997 11.8797L16.9116 11.8851C17.0682 11.9565 17.2492 11.9508 17.401 11.8697C17.5528 11.7885 17.6581 11.6413 17.6858 11.4715L17.6879 11.4584C18.3528 11.1267 19.0403 10.842 19.745 10.6066ZM18.657 9.82453C18.4034 9.92249 18.1522 10.0265 17.9036 10.1366L18.0282 9.37255L18.657 9.82453ZM15.6813 11.3243L14.9774 11.0036L15.0048 11.7764C15.2269 11.6201 15.4525 11.4694 15.6813 11.3243ZM13.0583 13.3738L12.3047 13.1963L12.4822 13.9499C12.5758 13.8518 12.6707 13.7546 12.7668 13.6584C12.863 13.5623 12.9602 13.4674 13.0583 13.3738ZM10.8848 15.8964L10.112 15.869L10.4327 16.5729C10.5778 16.3441 10.7285 16.1185 10.8848 15.8964ZM9.24495 18.7952L8.48095 18.9198L8.93293 19.5486C9.03089 19.295 9.13493 19.0438 9.24495 18.7952ZM8.20235 21.9575L7.4795 22.2283L8.0436 22.7556C8.09018 22.4881 8.14313 22.2219 8.20235 21.9575ZM7.79685 25.262L7.13993 25.6688L7.79685 26.0756C7.79361 25.9402 7.79198 25.8046 7.79198 25.6688C7.79198 25.5331 7.79361 25.3974 7.79685 25.262ZM8.0436 28.582L7.4795 29.1093L8.20235 29.3802C8.14313 29.1157 8.09019 28.8496 8.0436 28.582ZM8.93293 31.789L8.48095 32.4178L9.24495 32.5425C9.13493 32.2939 9.03089 32.0426 8.93293 31.789ZM10.4327 34.7648L10.112 35.4686L10.8848 35.4413C10.7285 35.2192 10.5778 34.9936 10.4327 34.7648ZM12.4822 37.3877L12.3047 38.1414L13.0583 37.9638C12.9602 37.8702 12.863 37.7754 12.7668 37.6792C12.6707 37.5831 12.5758 37.4859 12.4822 37.3877ZM15.0048 39.5613L14.9774 40.3341L15.6813 40.0133C15.4525 39.8682 15.2269 39.7175 15.0048 39.5613ZM17.9036 41.2011L18.0282 41.9651L18.657 41.5131C18.4034 41.4152 18.1522 41.3111 17.9036 41.2011ZM21.0659 42.2437L21.3367 42.9666L21.864 42.4025C21.5965 42.3559 21.3303 42.3029 21.0659 42.2437ZM24.3704 42.6492L24.7772 43.3061L25.184 42.6492C25.0486 42.6525 24.913 42.6541 24.7772 42.6541C24.6415 42.6541 24.5058 42.6525 24.3704 42.6492ZM27.6904 42.4025L28.2177 42.9666L28.4886 42.2437C28.2241 42.3029 27.958 42.3559 27.6904 42.4025ZM30.8974 41.5131L31.5262 41.9651L31.6509 41.2011C31.4023 41.3111 31.151 41.4152 30.8974 41.5131ZM33.8732 40.0133L34.577 40.3341L34.5497 39.5613C34.3276 39.7175 34.102 39.8682 33.8732 40.0133ZM36.4961 37.9638L37.2498 38.1414L37.0722 37.3877C36.9786 37.4859 36.8838 37.5831 36.7876 37.6792C36.6915 37.7754 36.5943 37.8702 36.4961 37.9638ZM38.6697 35.4413L39.4425 35.4686L39.1217 34.7648C38.9766 34.9936 38.8259 35.2192 38.6697 35.4413ZM40.3095 32.5425L41.0735 32.4178L40.6215 31.789C40.5236 32.0426 40.4195 32.2939 40.3095 32.5425ZM41.3521 29.3802L42.075 29.1093L41.5109 28.582C41.4643 28.8496 41.4113 29.1157 41.3521 29.3802ZM41.7576 26.0756L42.4145 25.6688L41.7576 25.262C41.7609 25.3974 41.7625 25.5331 41.7625 25.6688C41.7625 25.8046 41.7609 25.9402 41.7576 26.0756ZM41.5109 22.7556L42.075 22.2283L41.3521 21.9575C41.4113 22.2219 41.4643 22.4881 41.5109 22.7556ZM40.6215 19.5486L41.0735 18.9198L40.3095 18.7952C40.4195 19.0438 40.5236 19.295 40.6215 19.5486ZM39.1217 16.5729L39.4425 15.869L38.6697 15.8964C38.8259 16.1185 38.9766 16.3441 39.1217 16.5729ZM37.0722 13.9499L37.2498 13.1963L36.4961 13.3738C36.5943 13.4674 36.6915 13.5623 36.7876 13.6584C36.8838 13.7546 36.9786 13.8518 37.0722 13.9499ZM34.5497 11.7764L34.577 11.0036L33.8732 11.3243C34.102 11.4694 34.3276 11.6201 34.5497 11.7764ZM31.6509 10.1365L31.5262 9.37255L30.8974 9.82453C31.151 9.92249 31.4023 10.0265 31.6509 10.1365ZM28.4886 9.09395L28.2177 8.37111L27.6904 8.9352C27.958 8.98179 28.2241 9.03473 28.4886 9.09395ZM25.184 8.68845L24.7772 8.03153L24.3704 8.68845C24.5059 8.68521 24.6415 8.68358 24.7772 8.68358C24.913 8.68358 25.0486 8.68521 25.184 8.68845Z"
          fill="hsl(var(--foreground-light))"
        />
      </svg>
    ),
  },
  {
    title: 'Snaplet is now open source',
    description: 'Making it easier to build a secure and high-performing application',
    id: 'snaplet',
    is_shipped: true,
    links: [
      {
        url: '/blog/snaplet-is-now-open-source',
        label: 'Blog post',
        target: '_blank',
      },
    ],
    icon: (
      <svg
        width="50"
        height="51"
        viewBox="0 0 50 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.48275 41.9973C7.37468 41.9977 7.26748 41.9782 7.16662 41.9398C7.05927 41.8991 6.96111 41.8378 6.87783 41.7593C6.79455 41.6808 6.72779 41.5869 6.6814 41.4827C6.63502 41.3785 6.60994 41.2662 6.6076 41.1524C6.60527 41.0386 6.62572 40.9255 6.66779 40.8195C6.68809 40.7621 7.51174 38.4239 7.89167 30.5016C8.09758 26.1929 8.10339 24.3 7.75246 20.0689C7.41314 16.0187 7.96708 13.6375 9.38527 12.9854C11.3748 12.0806 13.1787 13.5398 14.9246 14.953C16.8503 16.5128 18.8399 18.1128 21.508 17.7278C23.3264 17.4578 23.9935 15.7717 24.8027 13.2296L24.8056 13.2206C25.4369 11.2442 26.0875 9.20768 27.9929 8.92086C28.8919 8.7916 29.8809 9.1363 30.9308 9.94921C35.9713 13.8529 41.8964 27.6867 42.894 37.881C42.9053 37.9938 42.8939 38.1077 42.8606 38.2162C42.8273 38.3246 42.7726 38.4255 42.6999 38.5131C42.6271 38.6005 42.5377 38.673 42.4366 38.7262C42.3356 38.7794 42.2249 38.8124 42.111 38.8232C41.8814 38.8448 41.6526 38.7752 41.4747 38.6298C41.2969 38.4844 41.1846 38.275 41.1626 38.0476C40.1388 27.566 34.0919 14.5825 29.8519 11.305C29.2109 10.811 28.6396 10.5668 28.2365 10.6271C27.4019 10.7501 26.9412 12.1917 26.4505 13.7268L26.4442 13.7466L26.4432 13.7495C25.701 16.0815 24.7782 18.9804 21.7517 19.4312C18.3208 19.9425 15.815 17.9146 13.8052 16.2715C12.1259 14.9128 11.0471 14.1028 10.0929 14.548C9.68979 14.7319 9.16195 16.3519 9.46067 19.9224C9.8203 24.2512 9.81159 26.1815 9.60278 30.5763C9.19965 38.961 8.3035 41.3337 8.2658 41.4314C8.20667 41.592 8.10064 41.7316 7.9612 41.8323C7.82177 41.9331 7.65522 41.9905 7.48275 41.9973Z"
          fill="hsl(var(--foreground-light))"
        />
        <path
          d="M11.5353 35.2812C11.4502 35.2805 11.3672 35.2555 11.2962 35.2091C11.2252 35.1627 11.1692 35.097 11.1351 35.0198C11.1112 34.9673 11.0982 34.9106 11.0969 34.853C11.0955 34.7955 11.1058 34.7382 11.1272 34.6847C11.1485 34.6311 11.1805 34.5823 11.2212 34.5412C11.2619 34.5001 11.3105 34.4675 11.3642 34.4453L14.7835 32.9918L11.1931 32.268C11.1372 32.257 11.0841 32.2352 11.0367 32.2038C10.9894 32.1724 10.9488 32.1321 10.9173 32.0851C10.8857 32.0381 10.8639 31.9854 10.853 31.9301C10.8421 31.8746 10.8423 31.8177 10.8538 31.7624C10.8645 31.7068 10.8863 31.6538 10.9178 31.6066C10.9494 31.5594 10.9901 31.5189 11.0375 31.4874C11.085 31.4559 11.1383 31.434 11.1944 31.4231C11.2505 31.412 11.3082 31.4122 11.3642 31.4234L16.3206 32.4231C16.4115 32.4409 16.4943 32.487 16.5569 32.5547C16.6195 32.6224 16.6586 32.7081 16.6686 32.7994C16.6778 32.8909 16.6574 32.983 16.6106 33.0625C16.5637 33.1419 16.4926 33.2047 16.4076 33.2417L11.7064 35.2439C11.6529 35.2687 11.5944 35.2815 11.5353 35.2812Z"
          fill="hsl(var(--foreground-light))"
        />
        <path
          d="M37.8279 31.0817H37.8511C37.9587 31.0817 38.0625 31.0424 38.1427 30.9714C38.223 30.9005 38.274 30.8027 38.2861 30.6968C38.2917 30.5827 38.2515 30.471 38.1744 30.386C38.0973 30.301 37.9895 30.2496 37.8743 30.243L34.1591 30.0447L37.2798 28.1432C37.3773 28.0822 37.4467 27.9858 37.4734 27.8746C37.4999 27.7635 37.4814 27.6464 37.4219 27.5486C37.3608 27.4522 37.264 27.3835 37.1522 27.3571C37.0405 27.3307 36.9228 27.349 36.8245 27.4079L32.5177 30.0361C32.4386 30.0837 32.3771 30.1552 32.3421 30.2399C32.3072 30.3248 32.3006 30.4185 32.3234 30.5072C32.3497 30.5921 32.4022 30.6667 32.4734 30.7209C32.5446 30.7749 32.631 30.8056 32.7207 30.8089L37.8279 31.0817Z"
          fill="hsl(var(--foreground-light))"
        />
        <path
          d="M24.2491 34.0434C23.538 34.0736 22.837 33.8691 22.2559 33.462C21.6749 33.055 21.2467 32.4684 21.0386 31.7943C20.9945 31.6515 21.0081 31.4971 21.0769 31.3641C21.1457 31.2311 21.2641 31.1299 21.4069 31.082C21.5519 31.0314 21.7113 31.0398 21.85 31.1056C21.9886 31.1713 22.0952 31.2888 22.1465 31.4324C22.5264 32.5814 23.527 33.0812 24.893 32.837C26.2589 32.5929 26.9898 31.7627 26.9637 30.5563C26.9637 30.4039 27.0248 30.2578 27.1336 30.1501C27.2424 30.0423 27.3899 29.9818 27.5437 29.9818C27.6975 29.9818 27.8451 30.0423 27.9538 30.1501C28.0627 30.2578 28.1238 30.4039 28.1238 30.5563C28.1615 32.3315 27.0014 33.647 25.0989 33.9889C24.8178 34.032 24.5334 34.0503 24.2491 34.0434Z"
          fill="hsl(var(--foreground-light))"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25.7358 27.736C26.5975 28.5895 27.7659 29.0696 28.9846 29.0712C30.2032 29.0696 31.3715 28.5895 32.2333 27.736C33.095 26.8825 33.5798 25.7253 33.5813 24.5183C33.5808 24.0901 33.5194 23.668 33.4019 23.2636L34.1502 23.1279C34.3389 23.0931 34.5059 22.9855 34.6147 22.8288C34.7234 22.6721 34.765 22.4791 34.7302 22.2921C34.695 22.1058 34.5867 21.9408 34.4292 21.8331C34.2716 21.7256 34.0775 21.684 33.8892 21.7176L32.7958 21.9158C32.7886 21.9171 32.7815 21.9186 32.7743 21.9201C32.7692 21.9212 32.7641 21.9224 32.759 21.9236C32.6038 21.7023 32.4282 21.4937 32.2333 21.3006C31.3715 20.4472 30.2032 19.967 28.9846 19.9655C27.7659 19.967 26.5975 20.4472 25.7358 21.3006C25.2144 21.817 24.831 22.4446 24.6091 23.1272C24.3641 23.0873 24.1157 23.0674 23.8666 23.0677C23.0492 23.068 22.2517 23.2841 21.5535 23.6872C21.4288 23.5248 21.2924 23.3701 21.145 23.2242C20.2834 22.3713 19.1155 21.8915 17.8973 21.89C16.6792 21.8915 15.5113 22.3713 14.6496 23.2242C14.039 23.8285 13.6175 24.5853 13.4229 25.4043L12.155 25.6357C12.0616 25.6526 11.9726 25.6876 11.8929 25.7386C11.8133 25.7897 11.7445 25.8558 11.6907 25.9332C11.6368 26.0105 11.5988 26.0977 11.579 26.1896C11.5591 26.2815 11.5577 26.3763 11.5749 26.4687C11.6048 26.6341 11.6922 26.7838 11.822 26.892C11.9519 27.0001 12.1159 27.0597 12.2855 27.0604C12.3295 27.058 12.3733 27.0513 12.416 27.0404L13.3222 26.8768C13.4253 27.9234 13.8914 28.9077 14.6486 29.6577C15.5103 30.5112 16.6786 30.9914 17.8973 30.9928C19.116 30.9914 20.2843 30.5112 21.1461 29.6577C22.0078 28.8042 22.4926 27.6471 22.4941 26.44C22.4931 25.9299 22.4059 25.4286 22.2402 24.9555C22.7284 24.6638 23.2903 24.507 23.8666 24.5069C24.0415 24.5074 24.2158 24.522 24.3879 24.5505C24.398 25.7459 24.8817 26.8901 25.7358 27.736ZM15.2449 28.1129C15.3672 28.3028 15.5107 28.4804 15.674 28.6421C16.2638 29.2262 17.0632 29.5551 17.8973 29.5567C18.7314 29.5551 19.5309 29.2262 20.1207 28.6421C20.5158 28.2507 20.7953 27.7661 20.9372 27.2403C20.6078 26.6592 19.3023 25.7228 17.9992 25.9287C16.7778 26.1217 15.6639 27.2351 15.2449 28.1129ZM20.9323 25.6247C20.7889 25.1054 20.5109 24.6269 20.1197 24.2397C19.53 23.6562 18.7309 23.3278 17.8973 23.3262V23.3234C17.0632 23.3249 16.2638 23.6538 15.674 24.2379C15.0842 24.822 14.7521 25.6139 14.7506 26.44C14.7508 26.5389 14.7557 26.6373 14.7652 26.7349C15.4725 25.8302 16.5683 24.9876 17.8165 24.794C18.9521 24.618 20.1012 25.0299 20.9323 25.6247ZM26.4604 26.3756C26.5515 26.4969 26.6519 26.6122 26.7612 26.7205C27.351 27.3046 28.1505 27.6334 28.9846 27.6349C29.8186 27.6334 30.6181 27.3046 31.2079 26.7205C31.5665 26.3653 31.8298 25.9333 31.9814 25.4636C31.4316 24.7613 30.0418 23.9971 28.8253 24.1907C27.503 24.3977 26.7425 25.6103 26.4604 26.3756ZM32.0872 24.0014C31.1515 23.3283 29.8463 22.885 28.6571 23.0705C27.3357 23.2786 26.4282 24.1391 25.8767 25.0016C25.8513 24.8427 25.8381 24.6812 25.8378 24.5183C25.8386 23.692 26.1704 22.8997 26.7603 22.3154C27.3502 21.7311 28.1502 21.4025 28.9846 21.4017C29.8188 21.4025 30.6188 21.7311 31.2088 22.3154C31.6742 22.7764 31.9789 23.3668 32.0872 24.0014Z"
          fill="hsl(var(--foreground-light))"
        />
      </svg>
    ),
  },
  {
    title: '',
    description: '',
    id: '',
    is_shipped: false,
    links: [],
    icon: null,
  },
  {
    title: '',
    description: '',
    id: '',
    is_shipped: false,
    links: [],
    icon: null,
  },
  {
    title: '',
    description: '',
    id: '',
    is_shipped: false,
    links: [],
    icon: null,
  },
  {
    title: '',
    description: '',
    id: '',
    is_shipped: false,
    links: [],
    icon: null,
  },
  {
    title: '',
    description: '',
    id: '',
    is_shipped: false,
    links: [],
    icon: null,
  },
  {
    title: '',
    description: '',
    id: '',
    is_shipped: false,
    links: [],
    icon: null,
    className:
      'col-span-full lg:col-span-1 xl:col-span-full max-h-[350px] md:max-h-[458px] xl:max-h-[267px]',
  },
]
