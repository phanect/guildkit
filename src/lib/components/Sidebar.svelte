<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="absolute top-[50%] translate-y-[-50%]">
  <aside class="flex flex-col items-center bg-white text-gray-700 shadow-sm h-full my-auto w-fit">
    <!-- Side Nav Bar-->

    <div class="h-16 flex items-center w-full">
      <!-- Logo Section -->
      <a class="h-6 w-6 mx-auto" href="/">
        <img class="h-6 w-6 mx-auto" src="/images/to-be-added.svg" alt="GuildKit" />
      </a>
    </div>

    <ul>
      <!-- Items Section -->
      <li class="hover:bg-gray-100">
        <a
          href="."
          class="h-16 px-6 flex justify-center items-center w-full
          focus:text-orange-500"
        >
          <img src="/vendor/tabler/inbox.svg" alt="Inbox" decoding="async" />
        </a>
      </li>

      <li class="hover:bg-gray-100">
        <a
          href="."
          class="h-16 px-6 flex justify-center items-center w-full
          focus:text-orange-500"
        >
          <img src="/vendor/tabler/bookmark.svg" alt="Bookmarks" decoding="async" />
        </a>
      </li>

      <li class="hover:bg-gray-100">
        <a
          href="."
          class="h-16 px-6 flex justify-center items-center w-full
          focus:text-orange-500"
        >
          <img src="/vendor/tabler/trash.svg" alt="Trash" decoding="async" />
        </a>
      </li>

      <li class="hover:bg-gray-100">
        <a
          href="."
          class="h-16 px-6 flex justify-center items-center w-full
          focus:text-orange-500"
        >
          <img src="/vendor/tabler/shopping-cart.svg" alt="Cart" decoding="async" />
        </a>
      </li>

      <li class="hover:bg-gray-100">
        <a
          href="."
          class="h-16 px-6 flex justify-center items-center w-full
          focus:text-orange-500"
        >
          <img src="/vendor/tabler/settings.svg" alt="Settings" decoding="async" />
        </a>
      </li>

      <li class="hover:bg-gray-100">
        <a
          href="."
          class="h-16 px-6 flex justify-center items-center w-full
          focus:text-orange-500"
        >
          <img src="/vendor/tabler/bell.svg" alt="Notifications" decoding="async" />
        </a>
      </li>
    </ul>

    <div class="mt-auto h-16 flex items-center w-full">
      <!-- Action Section -->
      <form
        action="/auth/logout?"
        method="post"
        use:enhance
        class="focus:text-orange-500 hover:bg-red-200 focus:outline-hidden w-full"
      >
        <button class="h-16 flex justify-center items-center mx-auto" type="submit">
          <img src="/vendor/tabler/logout-2.svg" alt="Logout" decoding="async" />
        </button>
      </form>
    </div>
  </aside>
</div>
