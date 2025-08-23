<script lang="ts">
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { org, jobs } = data;

  if (!org) {
    throw new Error("Could not find this organization.");
  }
</script>

<div class="profile">
  <h1 class="name">{org.name}</h1>
  <a href={org.props.url} class="url" target="_blank" rel="noopener noreferrer">
    <img src="/vendor/octicons/globe.svg" alt="" width="16" decoding="async" />
    {org.props.url}
  </a>

  {#if org.props.about}
    <section class="about">
      <h2 class="section-title about-title">About Us</h2>
      <p class="about-description">{org.props.about}</p>
    </section>
  {/if}

  <h2 class="section-title jobs-title">Open Positions</h2>
</div>

<section class="jobs">

  <JobList {jobs} />
</section>

<style lang="scss">
  @use "$lib/styles/mixins.scss";

  .profile {
    @include mixins.page-root;

    display: flex;
    flex-direction: column;
  }

  .name {
    font-size: 3.5rem;
    font-weight: 700;
    text-align: left;

    margin: {
      top: 4rem;
      bottom: 1rem;
    };
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .url {
    @include mixins.text-with-icon;

    align-self: right;
    font-size: 1rem;
    color: #787878;

    &:hover {
      color: rgb(97, 97, 97);
      text-decoration: underline;
    }
  }

  .about {
    margin: {
      top: 2.5rem;
      bottom: 2rem;
    }
  }

  .section-title {
    display: flex;
    justify-content: flex-start;
    column-gap: 0.5em;
    align-items: center;

    font-size: 2.5rem;
    color: #333;

    &::before {
      content: "";
      display: block;
      background-color: #888888;
      border-radius: 2px;
      width: 4px;
      height: 1.25em;
    }
  }

  .about-title {
    margin: {
      bottom: 2rem;
    }
  }
  .about-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    text-align: left;
    max-width: 800px;
    margin: 0 auto;
  }

  .jobs {
    width: 100%;
    max-width: 72rem;

    margin: {
      bottom: 2rem;
    }
  }
  .jobs-title {
    margin: {
      bottom: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .about,
    .jobs {
      padding: 0 1rem;
    }
  }
</style>
