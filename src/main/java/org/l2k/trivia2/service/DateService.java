package org.l2k.trivia2.service;

import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class DateService {

	public Date getCurrentDate() {
		return new Date();
	}

}
