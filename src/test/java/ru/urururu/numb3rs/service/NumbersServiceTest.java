package ru.urururu.numb3rs.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

//@DataMongoTest
//@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class NumbersServiceTest {
	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	NumbersService service;
	
    @Test
    public void addNumber() {
    	service.addNumber(BigDecimal.ONE, "other", "one", LocalDate.of(2022, 11, 30));
    }
}