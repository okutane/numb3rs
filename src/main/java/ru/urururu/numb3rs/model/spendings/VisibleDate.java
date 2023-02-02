package ru.urururu.numb3rs.model.spendings;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Builder
@Getter
public class VisibleDate {
    @ApiModelProperty(required = true)
    String value;

    @Nullable
    @ApiModelProperty(required = true)
    String style;
}
