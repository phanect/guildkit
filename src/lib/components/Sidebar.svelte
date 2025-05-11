<script lang="ts">
  import { signOut } from "$lib/auth/client.ts";
</script>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: fit-content;
    height: 100%;

    background-color: #ffffff;
    color: #414141;
    box-shadow: #e0e0e0 1.25rem 0 1rem -1rem;
  }

  .fit {
    width: fit-content;
    height: fit-content;

    // For `<button>`
    cursor: pointer;
  }

  .list {
    width: 100%;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 4rem;

    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    &:hover {
      background-color: #f6f3f4;
      width: 100%;
    }
  }
</style>

<aside class="sidebar">
  <ul class="list">
    <li class="item">
      <a href="." class="fit">
        <img src="/vendor/tabler/inbox.svg" alt="Inbox" width="32" height="32" decoding="async" />
      </a>
    </li>

    <li class="item">
      <a href="." class="fit">
        <img src="/vendor/tabler/bookmark.svg" alt="Bookmarks" width="32" height="32" decoding="async" />
      </a>
    </li>

    <li class="item">
      <a href="." class="fit">
        <img src="/vendor/tabler/trash.svg" alt="Trash" width="32" height="32" decoding="async" />
      </a>
    </li>

    <li class="item">
      <a href="." class="fit">
        <img src="/vendor/tabler/shopping-cart.svg" alt="Cart" width="32" height="32" decoding="async" />
      </a>
    </li>

    <li class="item">
      <a href="." class="fit">
        <img src="/vendor/tabler/settings.svg" alt="Settings" width="32" height="32" decoding="async" />
      </a>
    </li>

    <li class="item">
      <a href="." class="fit">
        <img src="/vendor/tabler/bell.svg" alt="Notifications" width="32" height="32" decoding="async" />
      </a>
    </li>

    <li class="item">
      <button class="fit" onclick={ () => signOut() }>
        <img src="/vendor/tabler/logout-2.svg" alt="Logout" width="32" height="32" decoding="async" />
      </button>
    </li>
  </ul>
</aside>
