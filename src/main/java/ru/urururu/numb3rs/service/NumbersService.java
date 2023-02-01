package ru.urururu.numb3rs.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.urururu.numb3rs.data.Number;
import ru.urururu.numb3rs.data.NumberRepository;

@Service
public class NumbersService {
    @Autowired
    NumberRepository numberRepository;

    public Number addNumber(BigDecimal value, String category, String comment, LocalDate date) {

        Number number = Number
            .builder()
            .category(category)
            .comment(comment)
            .date(date)
            .value(value)
            .pending(date.isAfter(LocalDate.now()))
            .build();

        return numberRepository.save(number);
    }

    public List<Number> listNumbers() {
        return numberRepository.findAll();
    }
}