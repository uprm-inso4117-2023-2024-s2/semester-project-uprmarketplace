module.exports = function (config) {
    config.set({
        mutate: [
            '<rootDir>/app/(tabs)/browse.tsx',
            '<rootDir>/app/(tabs)/personal-storefront.tsx',
        ],
        testRunner: 'jest',
        reporters: ['progress', 'clear-text', 'html'],
        coverageAnalysis: 'off',
        jest: {
            configFile: 'jest.config.js',
            enableFindRelatedTests: true,
            projectType: 'react',
            config: {
                testMatch: [
                    '<rootDir>/__tests__/BrowseScreen.test.tsx',
                    '<rootDir>/__tests__/Storefront.test.tsx',
                ],
            },
        },
    });
};
