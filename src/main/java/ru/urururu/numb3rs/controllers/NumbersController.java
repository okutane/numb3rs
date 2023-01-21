package ru.urururu.numb3rs.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ru.urururu.numb3rs.data.Number;
import ru.urururu.numb3rs.model.AddNumberRequest;
import ru.urururu.numb3rs.service.NumbersService;

@RestController
public class NumbersController {
    @Autowired
    NumbersService numbersService;

    @RequestMapping(value = "/numbers",
        method = RequestMethod.POST,
        consumes = "application/json",
        produces =
            "application/json")
    public Number addNumber(@Valid @RequestBody AddNumberRequest number) {
        return numbersService.addNumber(
            number.value,
            number.category,
            number.comment,
            LocalDate.parse(number.date, DateTimeFormatter.ISO_LOCAL_DATE)
        );
    }

    @RequestMapping(value = "/numbers", method = RequestMethod.GET, produces = "application/json")
    public List<Number> listNumbers() {
        return numbersService.listNumbers();
    }
}