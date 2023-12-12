export interface AdventDay {
  type: string | 'blog'
  icon?: any
  className?: string
  id: string
  title: string
  description?: string
  is_shipped: boolean
  image: string
  links: AdventLink[]
}

export interface AdventLink {
  url: string
  label: string
  target?: '_blank'
}

export const days: AdventDay[] = [
  {
    title: 'Supabase Album',
    description: 'The best soundtrack to build your app in a weekend',
    type: '',
    className: '',
    icon: (
      <svg
        width="28"
        height="27"
        viewBox="0 0 28 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.7005 0.762595C26.924 0.952594 27.0528 1.23111 27.0528 1.52442V18.7135C27.0528 19.2658 26.605 19.7135 26.0528 19.7135C25.5005 19.7135 25.0528 19.2658 25.0528 18.7135V2.70048L10.8169 5.0192V21.358C10.8169 21.9103 10.3692 22.358 9.81689 22.358C9.26461 22.358 8.81689 21.9103 8.81689 21.358V4.1689C8.81689 3.67866 9.17228 3.26072 9.65613 3.18191L25.892 0.537428C26.1815 0.490276 26.4771 0.572595 26.7005 0.762595Z"
          fill="#EDEDED"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.75794 18.3916C4.04672 18.3916 2.69897 19.7414 2.69897 21.3583C2.69897 22.9752 4.04672 24.325 5.75794 24.325C7.46916 24.325 8.8169 22.9752 8.8169 21.3583C8.8169 19.7414 7.46916 18.3916 5.75794 18.3916ZM0.698975 21.3583C0.698975 18.5937 2.98575 16.3916 5.75794 16.3916C8.53013 16.3916 10.8169 18.5937 10.8169 21.3583C10.8169 24.1229 8.53013 26.325 5.75794 26.325C2.98575 26.325 0.698975 24.1229 0.698975 21.3583Z"
          fill="#EDEDED"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.9935 15.7466C20.2823 15.7466 18.9346 17.0964 18.9346 18.7133C18.9346 20.3302 20.2823 21.68 21.9935 21.68C23.7048 21.68 25.0525 20.3302 25.0525 18.7133C25.0525 17.0964 23.7048 15.7466 21.9935 15.7466ZM16.9346 18.7133C16.9346 15.9487 19.2213 13.7466 21.9935 13.7466C24.7657 13.7466 27.0525 15.9487 27.0525 18.7133C27.0525 21.4779 24.7657 23.68 21.9935 23.68C19.2213 23.68 16.9346 21.4779 16.9346 18.7133Z"
          fill="#EDEDED"
        />
      </svg>
    ),
    id: '',
    is_shipped: true,
    links: [
      {
        url: 'https://supabase.productions/',
        label: 'Listen now',
        target: '_blank',
      },
    ],
    image: '',
  },
  {
    title: 'Postgres Language Server',
    description: 'Implementing the Parser',
    type: '',
    className: '',
    icon: (
      <svg
        width="34"
        height="32"
        viewBox="0 0 34 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.43881 3.75378C4.10721 1.93324 5.84055 0.723145 7.77992 0.723145H15.6033V0.734736H17.0394C23.8756 0.734736 29.4173 6.27652 29.4173 13.1127V20.1749C29.4173 20.7272 28.9696 21.1749 28.4173 21.1749C27.8651 21.1749 27.4173 20.7272 27.4173 20.1749V13.1127C27.4173 7.38109 22.771 2.73474 17.0394 2.73474H15.4396C15.3877 2.73474 15.3366 2.73078 15.2868 2.72314H7.77992C6.6793 2.72314 5.6956 3.40989 5.31627 4.44308L2.7812 11.3479C2.37375 12.4577 2.69516 13.7038 3.58855 14.4781L5.32807 15.9856C6.12772 16.6786 6.58711 17.6847 6.58709 18.7428L6.58706 21.5134C6.58702 23.8192 8.45627 25.6885 10.7621 25.6885C11.4007 25.6885 11.9184 25.1708 11.9184 24.5322L11.9185 12.1874C11.9185 9.59233 12.955 7.10481 14.7977 5.27761C15.1899 4.88873 15.823 4.8914 16.2119 5.28357C16.6008 5.67574 16.5981 6.3089 16.2059 6.69777C14.742 8.14943 13.9185 10.1257 13.9185 12.1874L13.9184 24.5323C13.9184 26.2754 12.5053 27.6885 10.7621 27.6885C7.35169 27.6885 4.58701 24.9238 4.58706 21.5134L4.58709 18.7428C4.5871 18.2647 4.37953 17.8101 4.01822 17.497L2.27871 15.9894C0.757203 14.6708 0.209829 12.5486 0.90374 10.6586L3.43881 3.75378ZM16.539 18.5225C17.0348 18.2791 17.634 18.4838 17.8773 18.9796C19.1969 21.6686 21.9313 23.3727 24.9267 23.3726L32.8043 23.3726C33.3566 23.3725 33.8043 23.8203 33.8043 24.3725C33.8044 24.9248 33.3566 25.3725 32.8044 25.3726L29.4081 25.3726C29.4142 25.4172 29.4173 25.4628 29.4173 25.5091C29.4173 29.0627 26.1868 31.4165 22.6091 31.4165C19.2966 31.4165 16.5385 29.0518 15.9271 25.9188C15.8213 25.3767 16.175 24.8516 16.717 24.7458C17.2591 24.64 17.7843 24.9936 17.89 25.5357C18.3217 27.7475 20.2716 29.4165 22.6091 29.4165C25.447 29.4165 27.4173 27.6256 27.4173 25.5091C27.4173 25.4628 27.4205 25.4172 27.4266 25.3726L24.9267 25.3726C21.1684 25.3727 17.7375 23.2346 16.0818 19.8607C15.8385 19.3649 16.0432 18.7658 16.539 18.5225Z"
          fill="#EDEDED"
        />
        <path
          d="M21.7224 13.0006C21.7224 13.6338 22.2358 14.1472 22.869 14.1472C23.5022 14.1472 24.0156 13.6338 24.0156 13.0006C24.0156 12.3674 23.5022 11.854 22.869 11.854C22.2358 11.854 21.7224 12.3674 21.7224 13.0006Z"
          fill="#EDEDED"
        />
      </svg>
    ),
    id: '',
    is_shipped: true,
    links: [
      {
        url: '/blog/postgres-language-server-implementing-parser',
        label: 'Read blog post',
      },
    ],
    image: '',
  },
  {
    type: '',
    title: 'Design at Supabase',
    description: "The transformative journey of Supabase's Design team",
    className: '',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.2446 8.70155C20.2295 7.69665 18.9596 7.26538 18.3333 8.05247L8.88245 19.9299C7.76695 21.3318 8.76744 23.3993 10.5614 23.3993H20.3351L20.45 31.0533C20.4651 32.0582 21.7349 32.4894 22.3612 31.7024L31.8121 19.825C32.9275 18.4231 31.927 16.3556 30.1332 16.3556H20.2949L20.2446 8.70155Z"
          fill="#EDEDED"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.39209 1.42236C9.22689 1.42236 9.06302 1.4277 8.90061 1.43819L8.40165 1.47044L8.33716 0.472517L8.83612 0.440273C9.01998 0.428392 9.20537 0.422363 9.39209 0.422363H10.3485V1.42236H9.39209ZM13.9131 0.422363H15.826V1.42236H13.9131V0.422363ZM19.3905 0.422363H21.3034V1.42236H19.3905V0.422363ZM24.8679 0.422363H26.7808V1.42236H24.8679V0.422363ZM30.3453 0.422363H31.3018C31.4885 0.422363 31.6739 0.428392 31.8577 0.440273L32.3567 0.472517L32.2922 1.47044L31.7932 1.43819C31.6308 1.4277 31.467 1.42236 31.3018 1.42236H30.3453V0.422363ZM4.8229 2.95351L4.44711 3.28333C4.20097 3.49936 3.96908 3.73124 3.75306 3.97738L3.42324 4.35317L2.67165 3.69353L3.00147 3.31774C3.24612 3.03899 3.50872 2.7764 3.78747 2.53175L4.16326 2.20193L4.8229 2.95351ZM36.5306 2.20193L36.9064 2.53175C37.1851 2.7764 37.4477 3.03899 37.6924 3.31774L38.0222 3.69353L37.2706 4.35317L36.9408 3.97738C36.7248 3.73124 36.4929 3.49936 36.2467 3.28333L35.871 2.95351L36.5306 2.20193ZM1.94016 7.93192L1.90792 8.43088C1.89742 8.59329 1.89209 8.75717 1.89209 8.92236V9.87881H0.89209V8.92236C0.89209 8.73564 0.898118 8.55025 0.91 8.36639L0.942244 7.86743L1.94016 7.93192ZM39.7516 7.86744L39.7838 8.36639C39.7957 8.55025 39.8018 8.73564 39.8018 8.92236V9.87881H38.8018V8.92236C38.8018 8.75717 38.7964 8.59329 38.7859 8.43088L38.7537 7.93192L39.7516 7.86744ZM39.8018 13.4433V15.3562H38.8018V13.4433H39.8018ZM1.89209 13.4433V15.3562H0.89209V13.4433H1.89209ZM1.89209 18.9207V20.8336H0.89209V18.9207H1.89209ZM39.8018 18.9207V20.8336H38.8018V18.9207H39.8018ZM1.89209 24.3982V26.3111H0.89209V24.3982H1.89209ZM39.8018 24.3982V26.3111H38.8018V24.3982H39.8018ZM1.89209 29.8756V30.832C1.89209 30.9972 1.89742 31.1611 1.90792 31.3235L1.94016 31.8225L0.942244 31.887L0.91 31.388C0.898118 31.2041 0.89209 31.0188 0.89209 30.832V29.8756H1.89209ZM39.8018 29.8756V30.832C39.8018 31.0188 39.7957 31.2041 39.7838 31.388L39.7516 31.887L38.7537 31.8225L38.7859 31.3235C38.7964 31.1611 38.8018 30.9972 38.8018 30.832V29.8756H39.8018ZM3.42324 35.4012L3.75306 35.777C3.96908 36.0232 4.20097 36.255 4.4471 36.4711L4.8229 36.8009L4.16326 37.5525L3.78746 37.2226C3.50872 36.978 3.24612 36.7154 3.00147 36.4367L2.67165 36.0609L3.42324 35.4012ZM38.0222 36.0609L37.6924 36.4367C37.4477 36.7154 37.1851 36.978 36.9064 37.2226L36.5306 37.5525L35.871 36.8009L36.2467 36.4711C36.4929 36.255 36.7248 36.0232 36.9408 35.777L37.2706 35.4012L38.0222 36.0609ZM8.40165 38.284L8.90061 38.3162C9.06302 38.3267 9.2269 38.332 9.39209 38.332H10.3485V39.332H9.39209C9.20537 39.332 9.01998 39.326 8.83612 39.3141L8.33716 39.2819L8.40165 38.284ZM32.3567 39.2819L31.8577 39.3141C31.6739 39.326 31.4885 39.332 31.3018 39.332H30.3453V38.332H31.3018C31.467 38.332 31.6308 38.3267 31.7932 38.3162L32.2922 38.284L32.3567 39.2819ZM13.9131 38.332H15.826V39.332H13.9131V38.332ZM19.3905 38.332H21.3034V39.332H19.3905V38.332ZM24.8679 38.332H26.7808V39.332H24.8679V38.332Z"
          fill="#EDEDED"
        />
      </svg>
    ),
    id: 'design-at-supabase',
    is_shipped: true,
    links: [
      {
        url: '/blog/how-design-works-at-supabase',
        label: 'Read blog post',
      },
    ],
    image: '',
  },
  {
    title: 'Supabase Grafana',
    description: 'Observability for your Supabase project',
    type: '',
    is_shipped: true,
    className: '',
    icon: (
      <svg
        width="34"
        height="36"
        viewBox="0 0 34 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.4652 15.7973C33.4026 15.2339 33.34 14.5452 33.0896 13.794C32.9017 13.0427 32.5887 12.2288 32.1505 11.3523C31.7122 10.4759 31.1488 9.59936 30.4601 8.72288C30.2097 8.40986 29.8967 8.03422 29.5211 7.7212C30.0219 5.71781 28.895 4.02746 28.895 4.02746C27.0168 3.90224 25.7647 4.5909 25.3264 4.96654C25.2639 4.96654 25.2012 4.90394 25.076 4.84132C24.763 4.71612 24.45 4.5909 24.0743 4.4657C23.6987 4.34048 23.3857 4.27788 23.01 4.15266C22.6344 4.09006 22.2587 4.02746 21.9457 3.96484C21.8831 3.96484 21.8205 3.96484 21.7579 3.96484C20.944 1.3354 18.565 0.208496 18.565 0.208496C15.9356 1.89886 15.4347 4.21527 15.4347 4.21527C15.4347 4.21527 15.4347 4.27788 15.4347 4.34048C15.3095 4.40308 15.1217 4.40308 14.9965 4.4657C14.8086 4.5283 14.6208 4.5909 14.3704 4.65352C14.1826 4.71612 13.9948 4.77872 13.7443 4.90394C13.3687 5.09176 12.9305 5.27956 12.5548 5.46738C12.1792 5.6552 11.8036 5.90562 11.4279 6.15606C11.3653 6.15606 11.3653 6.09344 11.3653 6.09344C7.67159 4.71612 4.41608 6.40648 4.41608 6.40648C4.10306 10.288 5.85602 12.7923 6.23166 13.2305C6.16904 13.4809 6.04384 13.7314 5.98123 13.9818C5.73081 14.8583 5.48038 15.7973 5.35518 16.7365C5.35518 16.8617 5.29256 16.9869 5.29256 17.1121C1.91185 18.8024 0.910156 22.2457 0.910156 22.2457C3.72742 25.5013 7.04553 25.689 7.04553 25.689C7.48378 26.4404 7.92202 27.1289 8.48546 27.8176C8.73588 28.068 8.98631 28.3811 9.17413 28.6315C8.17244 31.574 9.29934 34.0157 9.29934 34.0157C12.4296 34.1409 14.4956 32.6383 14.9339 32.2627C15.2469 32.3879 15.5599 32.4504 15.8729 32.5758C16.812 32.8262 17.8138 32.9514 18.8154 33.0139C19.0658 33.0139 19.3163 33.0139 19.5667 33.0139H19.6919H19.7545H19.8797H20.0049C21.5075 35.1425 24.0743 35.4556 24.0743 35.4556C25.9525 33.5147 26.0151 31.574 26.0151 31.1357V31.0732V31.0105C26.3907 30.7601 26.7663 30.4472 27.142 30.1341C27.8933 29.4454 28.5193 28.6942 29.0828 27.8803C29.1454 27.8176 29.208 27.7551 29.208 27.6299C31.3366 27.7551 32.7765 26.3152 32.7765 26.3152C32.4009 24.1239 31.1487 23.0596 30.8983 22.8719H30.8358C30.8358 22.7465 30.8358 22.6213 30.8358 22.4961C30.8358 22.2457 30.8358 21.9953 30.8358 21.8076V21.4945V21.4318V21.3693V21.3066V21.1814V20.9937C30.8358 20.931 30.8358 20.8685 30.8358 20.8058C30.8358 20.7433 30.8358 20.6806 30.8358 20.6179V20.4302V20.2423C30.7731 19.9919 30.7731 19.7415 30.7106 19.5536C30.4601 18.6147 30.1471 17.7381 29.6463 16.9242C29.1454 16.1104 28.582 15.4217 27.8933 14.7957C27.2046 14.1696 26.4534 13.7314 25.6395 13.3557C24.8256 12.9801 24.0117 12.7923 23.1353 12.6671C22.697 12.6044 22.3214 12.6044 21.8831 12.6044H21.7579H21.6953H21.6327H21.5701H21.4449C21.3823 12.6044 21.3196 12.6044 21.2571 12.6044C21.0692 12.6044 20.8188 12.6671 20.631 12.6671C19.8171 12.7923 19.0033 13.1053 18.3146 13.5435C17.6259 13.9818 16.9999 14.4826 16.499 15.0461C15.9982 15.6095 15.6225 16.2982 15.3721 16.9869C15.1217 17.6756 14.9965 18.3641 14.9339 19.0528C14.9339 19.2407 14.9339 19.3659 14.9339 19.5536C14.9339 19.6163 14.9339 19.6163 14.9339 19.679V19.8042C14.9339 19.8667 14.9339 19.9919 14.9339 20.0546C14.9965 20.3675 15.0591 20.7433 15.1217 21.0562C15.3095 21.6822 15.6225 22.2457 15.9356 22.7465C16.3112 23.2475 16.7494 23.6231 17.1877 23.936C17.6259 24.2491 18.1268 24.4995 18.6276 24.6247C19.1285 24.7499 19.5667 24.8126 20.0676 24.8126C20.1301 24.8126 20.1928 24.8126 20.2553 24.8126H20.318H20.3806C20.4432 24.8126 20.5058 24.8126 20.5058 24.8126C20.5058 24.8126 20.5058 24.8126 20.5684 24.8126H20.631H20.6936C20.7562 24.8126 20.8188 24.8126 20.8814 24.8126C20.944 24.8126 21.0067 24.8126 21.0692 24.7499C21.1944 24.7499 21.2571 24.6874 21.3823 24.6874C21.5701 24.6247 21.7579 24.5622 21.9457 24.437C22.1335 24.3743 22.2587 24.2491 22.4466 24.1239C22.5091 24.1239 22.5092 24.0614 22.5718 23.9987C22.7596 23.8735 22.7596 23.6231 22.6344 23.4979C22.5092 23.3727 22.3214 23.31 22.1962 23.4352C22.1335 23.4352 22.1335 23.4979 22.071 23.4979C21.9457 23.5604 21.8205 23.6231 21.6327 23.6856C21.5075 23.7483 21.3196 23.7483 21.1944 23.8108C21.1319 23.8108 21.0067 23.8108 20.944 23.8108C20.8814 23.8108 20.8814 23.8108 20.8188 23.8108C20.7562 23.8108 20.7562 23.8108 20.6936 23.8108C20.631 23.8108 20.631 23.8108 20.5684 23.8108C20.5058 23.8108 20.4432 23.8108 20.4432 23.8108H20.3806H20.318C20.2553 23.8108 20.2554 23.8108 20.1928 23.8108C19.8171 23.7483 19.5041 23.6856 19.1285 23.4979C18.7528 23.3727 18.4398 23.1223 18.1267 22.8719C17.8138 22.6213 17.5633 22.2457 17.3755 21.9328C17.1877 21.6197 16.9999 21.1814 16.9372 20.7433C16.8746 20.5554 16.8746 20.305 16.8746 20.1171C16.8746 20.0546 16.8746 19.9919 16.8746 19.9294V19.8667V19.8042C16.8746 19.679 16.8746 19.5536 16.9372 19.4284C17.1251 18.4893 17.5633 17.6129 18.3146 16.8617C18.5024 16.6738 18.6902 16.5486 18.8781 16.3607C19.0658 16.2355 19.3163 16.1104 19.5041 15.9852C19.7545 15.86 20.0049 15.7973 20.1928 15.7347C20.4432 15.6721 20.6936 15.6095 20.944 15.6095C21.0692 15.6095 21.1944 15.6095 21.3196 15.6095H21.3823H21.5075H21.5701H21.6953C21.9457 15.6095 22.2587 15.6721 22.5091 15.7347C23.0726 15.8599 23.5734 16.0478 24.0743 16.3607C25.076 16.9242 25.8899 17.8008 26.4534 18.8024C26.7038 19.3032 26.8916 19.8667 27.0168 20.4302C27.0168 20.5554 27.0794 20.7433 27.0794 20.8685V20.9937V21.1189C27.0794 21.1814 27.0794 21.1814 27.0794 21.2441C27.0794 21.3066 27.0794 21.3066 27.0794 21.3693V21.4945V21.6197C27.0794 21.6822 27.0794 21.8074 27.0794 21.8701C27.0794 22.058 27.0794 22.1832 27.0168 22.3709C27.0168 22.4961 26.9542 22.684 26.9542 22.8092C26.9542 22.9344 26.8915 23.1223 26.829 23.2475C26.7663 23.5604 26.6411 23.8735 26.5159 24.1239C26.2655 24.6874 25.9525 25.2509 25.5768 25.8142C24.8256 26.816 23.8239 27.6924 22.6344 28.1932C22.071 28.4438 21.4449 28.6315 20.8188 28.7567C20.5058 28.8194 20.1928 28.8194 19.8797 28.8819H19.8171H19.7545H19.6293H19.5041H19.4415C19.2537 28.8819 19.1285 28.8819 18.9406 28.8819C18.252 28.8194 17.5633 28.6942 16.9372 28.5063C16.3112 28.3186 15.6225 28.068 15.0591 27.7551C13.8696 27.1289 12.8053 26.2525 11.9288 25.1882C11.4905 24.6874 11.1149 24.1239 10.8645 23.4979C10.5514 22.8719 10.301 22.2457 10.1132 21.6197C9.9254 20.9937 9.80019 20.305 9.80019 19.679V19.5536V19.4911V19.3659V18.9903V18.9276V18.8024V18.7399C9.80019 18.6772 9.80019 18.552 9.80019 18.4893C9.80019 18.1764 9.86279 17.8008 9.86279 17.4877C9.9254 17.1746 9.988 16.799 10.0506 16.4861C10.1132 16.173 10.1758 15.7973 10.301 15.4843C10.4888 14.8583 10.7393 14.2322 10.9897 13.6061C11.5531 12.4166 12.2418 11.3523 13.1183 10.5385C13.3061 10.3506 13.5565 10.1002 13.807 9.9124C14.0574 9.72458 14.3078 9.53676 14.5582 9.41156C14.8087 9.22374 15.0591 9.09852 15.3095 8.97332C15.4347 8.9107 15.5599 8.8481 15.6851 8.7855C15.7477 8.7855 15.8103 8.72288 15.8729 8.72288C15.9355 8.72288 15.9982 8.66028 16.0608 8.66028C16.3112 8.53508 16.6242 8.47246 16.8746 8.34726C16.9372 8.34726 16.9999 8.28464 17.0625 8.28464C17.1251 8.28464 17.1877 8.22204 17.2503 8.22204C17.3755 8.15944 17.5633 8.15944 17.6885 8.09684C17.7511 8.09684 17.8138 8.03422 17.939 8.03422C18.0015 8.03422 18.0642 8.03422 18.1894 7.97162C18.252 7.97162 18.3146 7.97162 18.4398 7.90902H18.565H18.6902C18.7528 7.90902 18.8154 7.90902 18.9406 7.8464C19.0033 7.8464 19.1285 7.8464 19.1911 7.7838C19.2537 7.7838 19.3789 7.7838 19.4415 7.7838C19.5041 7.7838 19.5667 7.7838 19.6293 7.7838H19.7545H19.8171H19.8797C19.9424 7.7838 20.0676 7.7838 20.1301 7.7838H20.2553H20.318C20.3806 7.7838 20.4432 7.7838 20.5058 7.7838C20.8188 7.7838 21.0692 7.7838 21.3823 7.7838C21.9457 7.7838 22.5091 7.8464 23.0726 7.97162C24.1369 8.15944 25.1386 8.53508 26.0777 8.97332C27.0168 9.41156 27.8306 9.975 28.5193 10.6011C28.582 10.6637 28.582 10.6637 28.6445 10.7263C28.7072 10.7889 28.7072 10.7889 28.7697 10.8515C28.8324 10.9141 28.9576 10.9767 29.0201 11.1019C29.0828 11.2271 29.208 11.2271 29.2706 11.3523C29.3332 11.4775 29.4584 11.5402 29.5211 11.6028C29.834 11.9158 30.0844 12.2288 30.3349 12.6044C30.8358 13.2305 31.274 13.9192 31.587 14.5452C31.587 14.6078 31.6497 14.6078 31.6497 14.6704C31.6497 14.733 31.7122 14.733 31.7122 14.7957C31.7749 14.8583 31.7749 14.9209 31.8374 15.0461C31.9001 15.1087 31.9001 15.1713 31.9626 15.2965C32.0253 15.3591 32.0253 15.4217 32.0878 15.5469C32.2131 15.86 32.3383 16.1104 32.4009 16.3607C32.5261 16.799 32.6513 17.1746 32.7139 17.4877C32.7765 17.6129 32.9017 17.7381 33.0269 17.6756C33.1521 17.6756 33.2774 17.5504 33.2774 17.425C33.5278 16.6738 33.5278 16.2355 33.4652 15.7973Z"
          fill="#EDEDED"
        />
      </svg>
    ),
    id: 'supabase-grafana',
    links: [
      {
        url: 'https://github.com/supabase/supabase-grafana',
        label: 'View on GitHub',
        target: '_blank',
      },
    ],
    image: '',
  },
  {
    title: 'pg_graphql: Postgres functions',
    description: 'pg_graphql now supports User Defined Functions (UDFs)',
    type: '',
    is_shipped: true,
    className: '',
    icon: (
      <svg
        width="32"
        height="36"
        viewBox="0 0 32 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.662 31.8127L5.49355 27.6737C4.92892 28.2646 4.13313 28.6326 3.25138 28.6326C1.53875 28.6326 0.150391 27.2442 0.150391 25.5314C0.150391 24.0709 1.16004 22.8461 2.51943 22.5172V14.2427C1.16004 13.9137 0.150391 12.689 0.150391 11.2284C0.150391 9.51568 1.53875 8.12724 3.25138 8.12724C4.13313 8.12724 4.92893 8.49528 5.49355 9.08614L12.662 4.94716C12.5815 4.67102 12.5382 4.37893 12.5382 4.07676C12.5382 2.36403 13.9266 0.975586 15.6392 0.975586C17.3519 0.975586 18.7402 2.36403 18.7402 4.07676C18.7402 4.37806 18.6972 4.66932 18.6171 4.94475L25.7866 9.08429C26.3511 8.49446 27.1462 8.12715 28.0271 8.12715C29.7397 8.12715 31.1281 9.51559 31.1281 11.2283C31.1281 12.6871 30.1208 13.9107 28.7639 14.2414V22.5183C30.1208 22.8491 31.1281 24.0726 31.1281 25.5314C31.1281 27.2442 29.7397 28.6326 28.0271 28.6326C27.1462 28.6326 26.3511 28.2653 25.7866 27.6755L18.6171 31.8151C18.6973 32.0905 18.7402 32.3817 18.7402 32.683C18.7402 34.3957 17.3519 35.7842 15.6392 35.7842C13.9266 35.7842 12.5382 34.3957 12.5382 32.683C12.5382 32.3809 12.5814 32.0888 12.662 31.8127ZM15.6392 7.17793C15.9416 7.17793 16.2339 7.13464 16.5103 7.05391L25.8838 23.2902C25.4635 23.6923 25.1561 24.2114 25.014 24.7953H6.26446C6.12268 24.2129 5.81648 23.6949 5.39782 23.2932L14.7723 7.05513C15.0474 7.13507 15.3383 7.17793 15.6392 7.17793ZM6.26444 26.2677C6.25374 26.3117 6.24209 26.3553 6.22954 26.3985L13.3994 30.5382C13.9639 29.9488 14.7587 29.5818 15.6392 29.5818C16.5206 29.5818 17.3162 29.9496 17.8808 30.5401L25.0496 26.4009C25.0368 26.3569 25.0249 26.3125 25.014 26.2677H6.26444ZM3.99177 14.2406C5.34689 13.9086 6.35236 12.686 6.35236 11.2284C6.35236 10.9275 6.3095 10.6365 6.22954 10.3614L13.3995 6.22159C13.4313 6.25482 13.4639 6.28734 13.4971 6.31912L4.12403 22.5548C4.08034 22.542 4.03624 22.5301 3.99177 22.5192V14.2406ZM27.1586 22.5535C27.2025 22.5407 27.2468 22.5289 27.2916 22.518V14.2417C25.934 13.9115 24.9261 12.6876 24.9261 11.2283C24.9261 10.9265 24.9692 10.6348 25.0496 10.359L17.8807 6.21978C17.8493 6.25259 17.8172 6.28471 17.7845 6.31612L27.1586 22.5535Z"
          fill="#EDEDED"
        />
      </svg>
    ),
    id: '',
    links: [
      {
        url: '/blog/pg-graphql-postgres-functions',
        label: 'Read blog post',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: 'xl:col-span-2 xl:aspect-auto h-full',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: '',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: 'md:col-span-2 md:aspect-auto xl:col-span-3 xl:aspect-auto md:h-full',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: '',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: '',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: 'xl:col-span-2 xl:aspect-auto h-full',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: '',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    is_shipped: false,
    className: 'xl:col-span-2 md:aspect-auto h-full',
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
  {
    title: '',
    type: '',
    className:
      'md:col-span-2 md:aspect-[2/1] md:col-span-1 md:aspect-auto xl:col-span-2 xl:aspect-[2/1] h-full',
    is_shipped: false,
    icon: '',
    id: '',
    links: [
      {
        url: '',
        label: '',
      },
    ],
    image: '',
  },
]
