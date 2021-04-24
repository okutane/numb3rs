package ru.urururu.numb3rs.model.spendings;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class VisibleDates {
    @ApiModelProperty(required = true)
    List<VisibleDate> dates;
}
