import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import {
    BASE_FONT_SIZES,
    FONT_WEIGHTS,
    HTML_FONT_SIZE,
    LINE_HEIGHTS,
} from '@constant';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

// TODO: Add the necessary typographies here.
/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (): TypographyOptions => ({
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,

    h1: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.H1),
        fontWeight: FONT_WEIGHTS.H1,
        lineHeight: LINE_HEIGHTS.H1,
    },

    h2: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.H2),
        fontWeight: FONT_WEIGHTS.H2,
        lineHeight: LINE_HEIGHTS.H2,
    },
    h3: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.H3),
        fontWeight: FONT_WEIGHTS.H3,
        lineHeight: LINE_HEIGHTS.H3,
    },
    h4: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.H4),
        fontWeight: FONT_WEIGHTS.H4,
        lineHeight: LINE_HEIGHTS.H4,
    },
    h5: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.H5),
        fontWeight: FONT_WEIGHTS.H5,
        lineHeight: LINE_HEIGHTS.H5,
    },
    h6: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.H6),
        fontWeight: FONT_WEIGHTS.H6,
        lineHeight: LINE_HEIGHTS.H6,
    },
    body1: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.BODY1),
        fontWeight: FONT_WEIGHTS.BODY,
        lineHeight: LINE_HEIGHTS.BODY,
    },
    body2: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.BODY2),
        fontWeight: FONT_WEIGHTS.BODY,
        lineHeight: LINE_HEIGHTS.BODY,
    },
    button: {
        fontSize: typographyUtil.pxToRem(BASE_FONT_SIZES.BUTTON),
        fontWeight: FONT_WEIGHTS.BUTTON,
        lineHeight: LINE_HEIGHTS.BUTTON,
    },
});

export const typography = { typographyStyle, typographyUtil };
