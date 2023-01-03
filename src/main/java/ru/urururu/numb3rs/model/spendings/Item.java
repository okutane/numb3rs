package ru.urururu.numb3rs.model.spendings;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class Item {
    BigDecimal value;
    String comment;
    boolean pending;
}
