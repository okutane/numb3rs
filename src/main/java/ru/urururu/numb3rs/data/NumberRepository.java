package ru.urururu.numb3rs.data;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NumberRepository extends MongoRepository<Number, ObjectId> {
}
