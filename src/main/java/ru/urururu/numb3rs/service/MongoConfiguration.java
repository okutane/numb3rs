package ru.urururu.numb3rs.service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({ "production" })
@Configuration
public class MongoConfiguration {

	@Value("${mongoUsr}")
	private String mongoUsr;

	@Value("${mongoPwd}")
	private String mongoPwd;

	@Bean
	public MongoClient getMongoClient() {
		return MongoClients.create("mongodb://localhost:27017");
	}
}
