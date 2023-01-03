package ru.urururu.numb3rs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urururu.numb3rs.data.Number;
import ru.urururu.numb3rs.model.spendings.*;
import ru.urururu.numb3rs.service.NumbersService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@RestController
public class SpendingsController {
    @Autowired
    NumbersService numbersService;

    @GetMapping(value = "/spendings", produces = "application/json")
    SpendingsResponse showSpendings() {
        AtomicReference<BigDecimal> paid = new AtomicReference<>(BigDecimal.ZERO);
        AtomicReference<BigDecimal> planned = new AtomicReference<>(BigDecimal.ZERO);

        List<Number> numbers = numbersService.listNumbers();

        Map<String, Category> subCats = new TreeMap<>();
        TreeMap<LocalDate, VisibleDate> visibleDates = new TreeMap<>();
        numbers.stream()
                .forEach(n -> {
                    Item item = new Item(n.getValue(), n.getComment(), n.isPending());

                    String date = n.getDate()
                            .format(DateTimeFormatter.ISO_LOCAL_DATE);
                    subCats.computeIfAbsent(n.getCategory(), key -> Category.builder()
                                    .title(key)
                                    .items(new TreeMap<>())
                                    .build()).getItems().computeIfAbsent(date, d -> new ArrayList<>())
                            .add(item);

                    visibleDates.put(n.getDate(), VisibleDate.builder()
                            .value(date)
                            .build());

                    if (n.isPending()) {
                        planned.set(planned.get()
                                .add(n.getValue()));
                    } else {
                        paid.set(paid.get()
                                .add(n.getValue()));
                    }
                });

        Category home = Category.builder()
                .title("Ремонт")
                .expected(BigDecimal.valueOf(15000000))
                .subCats(subCats)
                .build();

        Expenses expenses = Expenses.builder()
                .cats(Collections.singletonMap("home", home))
                .total(paid.get()
                        .add(planned.get()))
                .paid(paid.get())
                .planned(planned.get())
                .build();

        return SpendingsResponse.builder()
                .expenses(expenses)
                .visibleDates(VisibleDates.builder()
                        .dates(visibleDates.values()
                                .stream()
                                .collect(Collectors.toList()))
                        .build())
                .build();
        /**

         expenses: {
         cats: {
         home: {
         "title": "Ремонт",
         expected: 15000000,
         subCats: {
         "work": { "title": "Основные работы" },
         "internal": { "title": "Черновые материалы", "expected": 1500000 },
         "external": { "title": "Чистовые материалы" },
         "furniture": { "title": "Мебель" },
         "doors": {
         "title": "Двери",
         "items": {
         "2022-08-01": [{ value: 240000, comment: "Входная" }],
         "2022-09-01": [{ value: 104400, comment: "Входная" }],
         "2022-10-01": [{ value: 356000, comment: "Межкомнатные" }],
         "2022-11-01": [{ value: 151296, comment: "Межкомнатные" }]
         }
         },
         "legal": {
         "title": "Согласование",
         "expected": 80000,
         "items": {
         "2022-11-16": [{ value: 1950, comment: "Доверенность" }],
         "2022-11-30": [{ value: 250000, comment: "Услуги" }]
         }
         }
         }
         }
         }
         }
         };
         *
         * */
    }

}
