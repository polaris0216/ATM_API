package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//画面を表示していくコントローラー

@Controller
public class SpaController {

	@GetMapping("/bankTrading")
	public String atm() {
		return "atm";
	}
}
