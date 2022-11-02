// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'installing', 'initializing', 'upgrade-guide'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Auth',
      items: [
        'generated/auth-signup',
        'generated/auth-signinwithpassword',
        'generated/auth-signinwithotp',
        'generated/auth-signinwithoauth',
        'generated/auth-signout',
        'generated/auth-verifyotp',
        'generated/auth-currentsession',
        'generated/auth-currentuser',
        'generated/auth-updateuser',
        'generated/auth-onauthstatechange',
        'generated/auth-resetpasswordforemail',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Functions',
      items: ['generated/invoke'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Database',
      items: [
        'generated/select',
        'generated/insert',
        'generated/update',
        'generated/upsert',
        'generated/delete',
        'generated/rpc',
        {
          type: 'category',
          label: 'Filters',
          items: [
            'generated/using-filters',
            'generated/or',
            'generated/not',
            'generated/match',
            'generated/eq',
            'generated/neq',
            'generated/gt',
            'generated/gte',
            'generated/lt',
            'generated/lte',
            'generated/like',
            'generated/ilike',
            'generated/is_',
            'generated/in_',
            'generated/contains',
            'generated/containedby',
            'generated/rangelt',
            'generated/rangegt',
            'generated/rangegte',
            'generated/rangelte',
            'generated/rangeadjacent',
            'generated/overlaps',
            'generated/textsearch',
            'generated/filter',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Modifiers',
          items: [
            'generated/using-modifiers',
            'generated/limit',
            'generated/order',
            'generated/range',
            'generated/single',
          ],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Realtime',
      items: [
        'generated/stream',
        'generated/subscribe',
        'generated/removechannel',
        'generated/removeallchannels',
        'generated/getchannels',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Storage',
      items: [
        'generated/storage-createbucket',
        'generated/storage-getbucket',
        'generated/storage-listbuckets',
        'generated/storage-updatebucket',
        'generated/storage-deletebucket',
        'generated/storage-emptybucket',
        'generated/storage-from-upload',
        'generated/storage-from-download',
        'generated/storage-from-list',
        'generated/storage-from-update',
        'generated/storage-from-move',
        'generated/storage-from-remove',
        'generated/storage-from-createsignedurl',
        'generated/storage-from-getpublicurl',
      ],
      collapsed: true,
    },
  ],
}

module.exports = sidebars
