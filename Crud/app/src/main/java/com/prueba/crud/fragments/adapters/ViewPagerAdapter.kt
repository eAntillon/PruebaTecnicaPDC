package com.prueba.crud.fragments.adapters

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT
import androidx.fragment.app.FragmentStateManager

class ViewPagerAdapter(supportFragmentManager: FragmentManager) : FragmentManager(supportFragmentManager, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    private val fragmentList = ArrayList<Fragment>()
    private val titleList = ArrayList<String>()

    override fun getItem(position: Int): Fragment {
        return fragmentList[position]
    }

    fun addFragment(fragment: Fragment, title: String){
        fragmentList.add(fragment)
        titleList.add(title)
    }

    override fun getCount(): Int {
        return fragmentList.size
    }

    override fun getPageTitle(position: Int): CharSequence? {
        return titleList[position]
    }

    fun addFragment(fragment: Fragment, title: String?) {
        fragmentList.add(fragment)
        titleList.add(title!!)
    }
}