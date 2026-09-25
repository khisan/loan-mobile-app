import { useRouter } from "expo-router"
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useAuth } from "../../hooks/useAuth"

export default function Dashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          await logout()
          router.replace("/auth/login")
        },
      },
    ])
  }

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" />

      {/* Header Section */}
      <View className="px-6 pt-14 pb-8 bg-slate-800 border-b border-slate-700/60">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-slate-400 text-xs font-medium tracking-wider uppercase">
              Dashboard
            </Text>
            <Text className="text-white text-2xl font-bold mt-1">
              {user?.fullName || "Guest"}
            </Text>
            <Text className="text-emerald-400 text-xs font-semibold mt-0.5">
              Role: {user?.role || "User"}
            </Text>
          </View>

          {/* User Avatar & Logout */}
          {/* <Button title="Logout" onPress={handleLogout} />
          <Text className="text-white font-bold text-base">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
          </Text> */}
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            className="w-11 h-11 bg-slate-700 border border-slate-600 rounded-full justify-center items-center"
          >
            <Text className="text-white font-bold text-base">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1 px-6 pt-6"
      >
        {/* Summary Cards (Portofolio Metrics)*/}
        <Text className="text-slate-300 font-semibold text-base mb-3">
          Ikhtisar Portofolio Pinjaman
        </Text>

        <View className="flex-row gap-3 mb-6">
          {/* Card 1: Total Project Finance */}
          <View className="flex-1 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <Text className="text-slate-400 text-xs font-medium">
              Total Komitment
            </Text>
            <Text className="text-white text-lg font-bold mt-1">Rp 1.25 T</Text>
            <Text className="text-emerald-400 text-[10px] mt-2 font-medium">
              ↑ 12.5% dari Kuartal Lalu
            </Text>
          </View>

          {/* Card 2: Active Portfolio */}
          <View className="flex-1 bg-slate-800/80 p-4 rounded-xl border-slate-700">
            <Text className="text-slate-400 text-xs font-medium">
              Pengajuan Aktif
            </Text>
            <Text className="text-white text-lg font-bold mt-1">18 Proyek</Text>
            <Text className="text-amber-400 text-[10px] mt-2 font-medium">
              4 Membutuhkan Review
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text className="text-slate-300 font-semibold text-base mb-3">
          Aksi Cepat
        </Text>
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/main/loan-request")}
            className="flex-1 bg-blue-600 p-4 rounded-xl justify-between"
          >
            <View className="w-8 h-8 bg-blue-500 rounded-lg justify-center items-center mb-3">
              <Text className="text-white font-bold text-lg">+</Text>
            </View>
            <View>
              <Text className="text-white font-bold text-sm">
                Pengajuan Baru
              </Text>
              <Text className="text-blue-200 text-xs mt-0.5">
                Input kredit proyek
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-1 bg-slate-800 p-4 rounded-xl"
          >
            {" "}
            <View className="w-8 h-8 bg-slate-800 p-4 rounded-xl justify-between border border-slate-700">
              <Text className="text-slate-300 font-bold text-base">📄</Text>
            </View>
            <View>
              <Text className="text-white font-bold text-sm">Laporan Risk</Text>
              <Text className="text-slate-400 text-xs mt-0.5">
                Analisis Kredit
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Loan Applications table / List */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-slate-300 font-semibold text-base">
            Pengajuan Terbaru
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-300 text-xs font-semibold">
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
          {/* Item 1 */}
          <View className="p-4 border-b border-slate-700/60 flex-row justify-between items-center">
            <View className="flex-1 mr-3">
              <Text className="text-white font-semibold text-sm">
                Proyek Tol Trans Sumatera
              </Text>
              <Text className="text-slate-400 text-xs mt-0.5">
                PT Anonymous Finance
              </Text>
              <Text className="text-slate-300 font-medium text-xs mt-1">
                Plafond: Rp 450 Miliar
              </Text>
            </View>
            <View className="bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
              <Text className="text-amber-400 text-[10px] font-semibold">
                Under Review
              </Text>
            </View>
          </View>

          {/* Item 2 */}
          <View className="p-4 border-b border-slate-700/60 flex-row justify-between items-center">
            <View className="flex-1 mr-3">
              <Text className="text-white font-semibold text-sm">
                PLTB EBT Sulawesi 50MW
              </Text>
              <Text className="text-slate-400 text-xs mt-0.5">
                PT Energi Hijau Utama
              </Text>
              <Text className="text-slate-300 font-medium text-xs mt-1">
                Plafond: Rp 280 Miliar
              </Text>
            </View>
            <View className="bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <Text className="text-emerald-400 text-[10px] font-semibold">
                Approved
              </Text>
            </View>
          </View>

          {/* Item 3 */}
          <View className="p-4 border-b border-slate-700/60 flex-row justify-between items-center">
            <View className="flex-1 mr-3">
              <Text className="text-white font-semibold text-sm">
                Pelabuhan Logistik Teluk
              </Text>
              <Text className="text-slate-400 text-xs mt-0.5">
                PT Maritim Indonesia
              </Text>
              <Text className="text-slate-300 font-medium text-xs mt-1">
                Plafond: Rp 120 Miliar
              </Text>
            </View>
            <View className="bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <Text className="text-emerald-400 text-[10px] font-semibold">
                Disbursed
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
