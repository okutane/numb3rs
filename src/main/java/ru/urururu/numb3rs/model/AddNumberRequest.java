package ru.urururu.numb3rs.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class AddNumberRequest {
    @NotNull
    @DecimalMin(value = "0", inclusive = false)
    public BigDecimal value;

    @Size(min = 1)
    @NotNull
    public String category;

    @Size(min = 1)
    @NotNull
    public String comment;

    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(required = true, example = "2021-08-20")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    public String date;

    public Boolean pending;
}
