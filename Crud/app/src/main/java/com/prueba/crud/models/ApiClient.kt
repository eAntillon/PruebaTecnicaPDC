package com.prueba.crud.models

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiClient {

//    private val retrofit: Retrofit = Retrofit.Builder().baseUrl("http://ec2-18-220-162-153.us-east-2.compute.amazonaws.com:3000")
    private val retrofit: Retrofit = Retrofit.Builder().baseUrl("http://192.168.0.4:3000")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    val service = retrofit.create(ApiService::class.java)
}