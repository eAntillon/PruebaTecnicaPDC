package com.prueba.crud.adapter

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.prueba.crud.databinding.ViewPaisItemBinding
import com.prueba.crud.models.ApiClient
import com.prueba.crud.models.ApiService
import com.prueba.crud.models.PaisDbResultItem
import kotlin.concurrent.thread

class PaisAdapter(private val paises: ArrayList<PaisDbResultItem>): RecyclerView.Adapter<PaisAdapter.ViewHolder>(){
    class ViewHolder(private val binding: ViewPaisItemBinding): RecyclerView.ViewHolder(binding.root){
        fun bind( pais: PaisDbResultItem){
            binding.idpais.text = pais.IdPais.toString()
            binding.nompais.text = pais.NomPais
            binding.delete.setOnClickListener {
                thread {
                    val res = ApiClient.service.deletePais(pais.IdPais.toString()).execute()
                    Log.d("PaisAdapter", "Delete: ${res.body()}")
                }
            }
        }


        }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
//        val view = LayoutInflater.from(parent.context).inflate(R.layout.view_pais_item, parent, false)
//        return ViewHolder(view)

        val binding = ViewPaisItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)


        return ViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return paises.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        holder.bind(paises[position])
    }

    fun addPais(pais: PaisDbResultItem){
        paises.add(pais)
        notifyDataSetChanged()
    }
}