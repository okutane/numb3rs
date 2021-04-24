package ru.urururu.numb3rs.model.spendings;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SpendingsResponse {
    @ApiModelProperty(required = true)
    Expenses expenses;

    @ApiModelProperty(required = true)
    VisibleDates visibleDates;
}
