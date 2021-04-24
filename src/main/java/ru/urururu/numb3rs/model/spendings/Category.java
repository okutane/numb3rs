package ru.urururu.numb3rs.model.spendings;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Builder
@Getter
public class Category {
    @ApiModelProperty(required = true)
    String title;
    BigDecimal expected;

    @ApiModelProperty(required = true)
    Map<String, Category> subCats;

    @ApiModelProperty(required = true)
    Map<String, List<Item>> items;
}
