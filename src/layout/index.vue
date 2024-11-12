<script setup>
import { h, ref } from 'vue'
import {
  NIcon,
  darkTheme,
  dateZhCN,
  zhCN,
  NConfigProvider,
  NLayout,
  NSpace,
  NLayoutSider,
  NMenu,
  NLayoutHeader,
  NDropdown,
  NButton,
  NLayoutContent,
  useMessage,
} from 'naive-ui'
import {
  ChevronDownOutline,
  HomeOutline,
} from '@vicons/ionicons5'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { token } from '@/lib/token'

const route = useRoute()
const msg = useMessage()
const router = useRouter()

const collapsed = ref(false)
const activeKey = ref(route.path)

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/demo',
          },
        },
        { default: () => '首页' },
      ),
    key: '/demo',
    icon: renderIcon(HomeOutline),
  },
]

const userDropdownOptions = [
  {
    label: '退出登录',
    key: 'logout',
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    token.value = ''
    msg.success('退出登录成功')
    router.push('/login')
  }
}

const username = ref('未登录')
if (token.value) {
  username.value = 'admin'
}
</script>

<template>
  <NConfigProvider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <NSpace vertical>
      <NLayout has-sider>
        <NLayoutSider class="sider" bordered :native-scrollbar="false" collapse-mode="width" :collapsed-width="64"
          :width="240" :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
          <NMenu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
            :options="menuOptions" />
        </NLayoutSider>
        <NLayout>
          <NLayoutHeader class="header">
            <div>后台管理</div>
            <div class="user">
              <NDropdown trigger="hover" :options="userDropdownOptions" @select="handleSelect">
                <NButton icon-placement="right" quaternary>
                  <template #icon>
                    <NIcon>
                      <ChevronDownOutline />
                    </NIcon>
                  </template>
                  {{ username }}
                </NButton>
              </NDropdown>
            </div>
          </NLayoutHeader>
          <NLayoutContent content-style="padding: 12px;">
            <RouterView />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NSpace>
  </NConfigProvider>
</template>

<style lang="scss" scoped>
.sider {
  height: 100vh;
}

.header {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user {
    cursor: pointer;
  }
}
</style>
