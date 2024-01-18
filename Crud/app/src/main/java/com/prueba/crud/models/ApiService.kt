package com.prueba.crud.models

import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {

    @GET("paises")
    fun getPaises(): Call<PaisDbResult>

    @GET("departamentos")
    fun getDepartamentos(): Call<DepartamentoDbResult>

    @GET("personas")
    fun getPersonas(): Call<PersonaDbResult>

    @POST("paises")
    fun postPaises(): Call<PaisDbResult>
}