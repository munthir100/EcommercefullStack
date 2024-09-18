<?php

return [
  'src' => [
    'app' => [
      'admin' => [
        'page.tsx',
        'layout.tsx',
        'components' => [
          'topBar.tsx',
          'sideBar.tsx',
        ],
      ],
      '(auth)' => [
        'login' => [
          'page.tsx',
          'form.tsx',
          'validation-schema.tsx',
          'error.tsx',
        ],
        'register' => [
          'page.tsx',
          'form.tsx',
          'validation-schema.tsx',
          'error.tsx',
        ],
        'actions.tsx',
      ],
      'products' => [
        'page.tsx',
        '[id]' => [
          'page.tsx',
        ],
        'create' => [
          'page.tsx',
          'form.tsx',
          'formAction.tsx',
          'validation-schema.tsx',
        ],
        'edit' => [
          'page.tsx',
          'form.tsx',
        ],
      ],
    ],
    'data' => [
      'api.tsx',
      'types.tsx',
    ],
  ],
];
