package com.prueba.crud.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.prueba.crud.R

class DialogCreatePais : DialogFragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_diaglog_create_pais, container, false)
    }

    companion object {

        @JvmStatic
        fun newInstance(param1: String, param2: String) = DialogCreatePais().apply {
            arguments = Bundle().apply {}
        }
    }
}