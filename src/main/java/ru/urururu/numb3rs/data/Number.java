package ru.urururu.numb3rs.data;

import lombok.Builder;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Getter
public class Number {
    private ObjectId id;
    private BigDecimal value;
    private String category;
    private String comment;
    private LocalDate date;
    private boolean pending;

    @CreatedDate
    private LocalDate createdDate;
}
