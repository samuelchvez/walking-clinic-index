import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFilters() {
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [languages, setLanguages] = useState([])   // specialized only (not English/French)

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')   // optional last filter

  const [loadingProvinces, setLoadingProvinces] = useState(true)
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingNeighborhoods, setLoadingNeighborhoods] = useState(false)

  // Fetch all provinces on mount
  useEffect(() => {
    async function fetchProvinces() {
      setLoadingProvinces(true)
      const { data, error } = await supabase
        .from('provinces')
        .select('id, name, code')
        .order('name')
      if (!error) setProvinces(data ?? [])
      setLoadingProvinces(false)
    }
    fetchProvinces()
  }, [])

  // Fetch specialized languages on mount (exclude official languages)
  useEffect(() => {
    async function fetchLanguages() {
      const { data, error } = await supabase
        .from('languages')
        .select('id, name')
        .order('name')
      if (!error) {
        setLanguages((data ?? []).filter(l => l.name !== 'English' && l.name !== 'French'))
      }
    }
    fetchLanguages()
  }, [])

  // Fetch cities when province changes
  useEffect(() => {
    if (!selectedProvince) {
      setCities([])
      setSelectedCity('')
      setNeighborhoods([])
      setSelectedNeighborhood('')
      return
    }
    async function fetchCities() {
      setLoadingCities(true)
      setCities([])
      setSelectedCity('')
      setNeighborhoods([])
      setSelectedNeighborhood('')
      const { data, error } = await supabase
        .from('cities')
        .select('id, name')
        .eq('province_id', selectedProvince)
        .order('name')
      if (!error) setCities(data ?? [])
      setLoadingCities(false)
    }
    fetchCities()
  }, [selectedProvince])

  // Fetch neighborhoods when city changes
  useEffect(() => {
    if (!selectedCity) {
      setNeighborhoods([])
      setSelectedNeighborhood('')
      return
    }
    async function fetchNeighborhoods() {
      setLoadingNeighborhoods(true)
      setNeighborhoods([])
      setSelectedNeighborhood('')
      const { data, error } = await supabase
        .from('neighborhoods')
        .select('id, name')
        .eq('city_id', selectedCity)
        .order('name')
      if (!error) setNeighborhoods(data ?? [])
      setLoadingNeighborhoods(false)
    }
    fetchNeighborhoods()
  }, [selectedCity])

  return {
    provinces,
    cities,
    neighborhoods,
    languages,
    selectedProvince,
    selectedCity,
    selectedNeighborhood,
    selectedLanguage,
    setSelectedProvince,
    setSelectedCity,
    setSelectedNeighborhood,
    setSelectedLanguage,
    loadingProvinces,
    loadingCities,
    loadingNeighborhoods,
  }
}
