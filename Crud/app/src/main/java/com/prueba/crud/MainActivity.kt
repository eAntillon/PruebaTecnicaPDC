package com.prueba.crud

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.viewpager.widget.ViewPager
import com.google.android.material.tabs.TabLayout
import com.prueba.crud.adapter.FragmentAdapter
import com.prueba.crud.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding= ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val adapter = FragmentAdapter(this, supportFragmentManager, binding.tabLayout.tabCount)
        binding.viewPager.adapter = adapter
        binding.viewPager.addOnPageChangeListener(
            TabLayout.TabLayoutOnPageChangeListener(binding.tabLayout)
        )
        binding.viewPager.addOnPageChangeListener(object : ViewPager.OnPageChangeListener {
            override fun onPageScrollStateChanged(state: Int) {
                // Do Nothing
            }

            override fun onPageScrolled(
                position: Int,
                positionOffset: Float,
                positionOffsetPixels: Int
            ) {
                // Do Nothing
            }

            override fun onPageSelected(position: Int) {
                binding.tabLayout.getTabAt(position)?.select()
            }
        })
        binding.tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab) {
                binding.viewPager.currentItem = tab.position
            }

            override fun onTabUnselected(tab: TabLayout.Tab) {
                // Do Nothing
            }

            override fun onTabReselected(tab: TabLayout.Tab) {
                // Do Nothing
            }
        })
    }
}
