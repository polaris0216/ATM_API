package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Account;
import com.example.resource.RequestAmount;
import com.example.resource.ResponseAmount;
import com.example.service.AccountService;

@RestController
@RequestMapping("/bankTrading")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    // AccountServiceをインジェクションします
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // データ取得用のWeb APIです
    @GetMapping("/list")
    public List<Account> list() {
        // List<Item>の形式で取得した値を返します
        return this.accountService.findAll();
    }

    // 新規口座開設
    @PostMapping("/open")
    public Account open() {
        // 保存したAccountオブジェクトを返します
        return this.accountService.createAccount();
	}

    //残高確認
    @GetMapping("{account_id}")
    public ResponseAmount getAmount(@PathVariable("account_id") Integer accountId, Model model) {
    	return this.accountService.getResponseAmount(accountId);
    }

    //預け入れ
    @PostMapping("/deposit/{account_id}")
    public ResponseAmount deposit(@PathVariable("account_id") Integer accountId, @RequestBody RequestAmount requestAmount) {
    	return this.accountService.depositAccount(accountId, requestAmount);
    }

    //引き出し
    @PostMapping("/withdraw/{account_id}")
    public ResponseAmount withdraw(@PathVariable("account_id") Integer accountId, @RequestBody RequestAmount requestAmount) {
        return accountService.withdrawAccount(accountId, requestAmount);
    }
}