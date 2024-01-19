package com.prueba.crud.models

import com.prueba.crud.fragments.Departamento
import com.prueba.crud.fragments.Persona
import com.prueba.crud.models.dto.PaisDTO
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {

    //    GET
    @GET("paises")
    fun getPaises(): Call<PaisDbResult>

    @GET("departamentos")
    fun getDepartamentos(): Call<DepartamentoDbResult>

    @GET("personas")
    fun getPersonas(): Call<PersonaDbResult>

    //    POST
    @Headers("Content-Type: application/json")
    @POST("paises")
    fun createPais(@Body pais: PaisDTO): Call<PaisDbResultItem>

    @Headers("Content-Type: application/json")
    @POST("departamentos")
    fun createDepartamento(@Body departamento: Departamento): Call<DepartamentoDbResultItem>

    @Headers("Content-Type: application/json")
    @POST("personas")
    fun createPersona(@Body persona: Persona): Call<PersonaDbResultItem>

    //    DELETE
    @DELETE("paises/{idPais}")
    fun deletePais(@Path("idPais") idPais: String): Call<PaisDbResultItem>

    @DELETE("departamentos/{idDepartamento}")
    fun deleteDepartamento(@Path("idDepartamento") idDepartamento: Number): Call<DepartamentoDbResultItem>

    @POST("personas/{idPersona}")
    fun deletePersona(@Path("idPersona") idPersona: Number): Call<PersonaDbResultItem>
}

