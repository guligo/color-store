package me.guligo.cs.utils;

public final class MiscUtil {

    private MiscUtil() {
        // empty
    }

    public final static String getColorCode(final int tokenId) {
        return "#" + String.format("%06x", tokenId);
    }

}
