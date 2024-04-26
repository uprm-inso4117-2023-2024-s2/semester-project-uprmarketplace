module.exports = {
    mutate: [
        'app/(tabs)/browse.tsx',
        'app/(tabs)/personal-storefront.tsx',
    ],
    testRunner: 'jest',
    reporters: ['progress', 'clear-text', 'html'],
    coverageAnalysis: 'off',
    jest: {
        enableFindRelatedTests: true,
        projectType: 'custom',
        config: {
            preset: 'jest-expo',
            testMatch: [
                '<rootDir>/__tests__/BrowseScreen.test.tsx',
                '<rootDir>/__tests__/Storefront.test.tsx',
            ],
        },
    },
    htmlReporter: {
        fileName: 'reports/mutation-report.html',
    },
};
