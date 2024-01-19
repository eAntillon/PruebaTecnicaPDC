package com.prueba.crud.fragments

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.DialogFragment
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.textfield.TextInputEditText
import com.prueba.crud.R
import com.prueba.crud.models.ApiClient
import kotlin.concurrent.thread
import com.prueba.crud.models.dto.PaisDTO
class DialogCreatePais : DialogFragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_diaglog_create_pais, container, false)
        val btnGuardar = view.findViewById<Button>(R.id.btnGuardar)
        val btnCancelar = view.findViewById<Button>(R.id.btnCancelar)
        btnCancelar.setOnClickListener {
            dismiss()
        }
        btnGuardar.setOnClickListener {
            Log.d("DialogCreatePais", "Guardar")
            // create a post object with the text and user
            val nombre = view.findViewById<TextInputEditText>(R.id.txtPais)
            thread {
                val pais = PaisDTO(
                    NomPais = nombre.text.toString()
                )
                val res = ApiClient.service.createPais(pais).execute()
                Log.d("DialogCreatePais", "Guardar: ${res.body()}")
                activity?.runOnUiThread {
                    val fragmentParent = parentFragment as Pais
                    fragmentParent.onCreatedPais(res.body()!!)
                    dismiss()
                }
            }

        }


        return view
    }

    companion object {

        @JvmStatic
        fun newInstance(param1: String, param2: String) = DialogCreatePais().apply {
            arguments = Bundle().apply {}
        }
    }
}