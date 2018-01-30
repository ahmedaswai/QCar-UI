<template>
    <div id="app">
        <navbar></navbar>
        <sidebar></sidebar>
        <section class="content">
            <div class="container-fluid">
                <router-view/>
            </div>
        </section>
    </div>
</template>

<script>
import navbar from "@/components/parts/_navbar";
import sidebar from "@/components/parts/_sidebar";

export default {
  name: "App",
  components: {
    navbar,
    sidebar
  }
};
</script>

<style>

</style>
