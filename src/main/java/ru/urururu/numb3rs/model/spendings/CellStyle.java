package ru.urururu.numb3rs.model.spendings;


public enum CellStyle {
    TODAY("today");

    private final String styleName;

    CellStyle(String styleName) {
        this.styleName = styleName;
    }

    public String getStyleName() {
        return styleName;
    }
}
