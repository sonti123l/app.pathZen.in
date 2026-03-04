//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    ...tanstackConfig,
    {
        ignores: ['.output/**', 'dist/**', 'node_modules/**', 'eslint.config.js', 'prettier.config.js']
    }
]
