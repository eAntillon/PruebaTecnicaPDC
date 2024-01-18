package com.prueba.crud.adapter

import android.content.Context
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import com.prueba.crud.fragments.Departamento
import com.prueba.crud.fragments.Pais
import com.prueba.crud.fragments.Persona

class FragmentAdapter(val context: Context, val fm: FragmentManager, val totalTabs: Int) : FragmentPagerAdapter(fm) {
    override fun getCount(): Int {
        return totalTabs
    }

    override fun getItem(position: Int): Fragment {
        return when(position){
            0 -> {
                Pais()
            }
            1 -> {
                Departamento()
            }
            2 -> {
                Persona()
            }
            else -> getItem(position)
        }
    }
}