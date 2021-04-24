package ru.urururu.numb3rs.model.spendings;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Map;

@Builder
@Getter
public class Expenses {
    @ApiModelProperty(required = true)
    Map<String, Category> cats;

    @ApiModelProperty(required = true)
    BigDecimal total;

    @ApiModelProperty(required = true)
    BigDecimal paid;

    @ApiModelProperty(required = true)
    BigDecimal planned;
}
