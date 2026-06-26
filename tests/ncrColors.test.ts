import { describe, it, expect } from "vitest";

/**
 * WCAG 2.1 relative luminance and contrast ratio utilities.
 * Used to verify that NCR carbon copy paper colors maintain
 * accessible text contrast against the site's foreground color.
 */

function srgbToLinear(channel: number): number {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (
        0.2126 * srgbToLinear(r) +
        0.7152 * srgbToLinear(g) +
        0.0722 * srgbToLinear(b)
    );
}

function contrastRatio(fg: string, bg: string): number {
    const l1 = relativeLuminance(fg);
    const l2 = relativeLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

// Site constants — must match BaseLayout.astro and Page.astro
const TEXT = "#444444";
const PAPER = "#ffffff";

// NCR carbon copy paper colors — must match Page.astro
const ncrColors: Record<string, string> = {
    white: "#f5f5f5",
    canary: "#fff9c4",
    pink: "#f8d7e8",
    blue: "#bbdefb",
};

const WCAG_AA_NORMAL = 4.5;
// Minimum contrast between paper and band color so bands are visible
const MIN_BAND_VISIBILITY = 1.05;

describe("NCR carbon copy color accessibility", () => {
    // Sanity check: paper itself must be accessible with text
    it("paper (#ffffff) has >= 4.5:1 contrast with text", () => {
        expect(contrastRatio(TEXT, PAPER)).toBeGreaterThanOrEqual(
            WCAG_AA_NORMAL,
        );
    });

    for (const [name, color] of Object.entries(ncrColors)) {
        describe(`${name} (${color})`, () => {
            it(`has >= 4.5:1 contrast with text ${TEXT}`, () => {
                const ratio = contrastRatio(TEXT, color);
                expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
            });

            it(`band is visible against paper (contrast >= ${MIN_BAND_VISIBILITY})`, () => {
                const ratio = contrastRatio(PAPER, color);
                expect(ratio).toBeGreaterThanOrEqual(MIN_BAND_VISIBILITY);
            });
        });
    }
});
