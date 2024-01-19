package com.prueba.crud.fragments

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.prueba.crud.R
import com.prueba.crud.adapter.PaisAdapter
import com.prueba.crud.models.ApiClient
import com.prueba.crud.models.PaisDbResultItem
import kotlin.concurrent.thread

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

class Pais : Fragment() {
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_pais, container, false)
        val fabButton = view.findViewById<FloatingActionButton>(R.id.addPais)

        fabButton.setOnClickListener {
            // Crea y muestra el DialogFragment cuando se hace clic en el botón
            val dialogFragment = DialogCreatePais()
            dialogFragment.show(childFragmentManager, "MyDialogFragment")

        }

        val recyclerAdapter = view.findViewById<RecyclerView>(R.id.recyclerPais)
        recyclerAdapter.adapter = PaisAdapter(ArrayList<PaisDbResultItem>())

        thread {
            val paises = ApiClient.service.getPaises().execute().body()
            activity?.runOnUiThread {
                recyclerAdapter.adapter = paises?.let { PaisAdapter(it) }
                Log.d("Pais", "Paises: ${paises?.size}")
            }
        }

        return view}

    fun onCreatedPais(pais: PaisDbResultItem) {
        val recyclerAdapter = view?.findViewById<RecyclerView>(R.id.recyclerPais)
        val adapter = recyclerAdapter?.adapter as PaisAdapter
        adapter.addPais(pais)
    }
    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            Pais().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}