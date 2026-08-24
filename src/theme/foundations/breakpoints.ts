import type { BreakpointsOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    // Remove xs and xl breakpoints
    interface BreakpointOverrides {
        xl: false;
    }
}
/* Custom Breakpoints */
export const breakpoints: BreakpointsOptions = {
    values: { xs: 0, sm: 450, md: 768, lg: 1280 },
};
