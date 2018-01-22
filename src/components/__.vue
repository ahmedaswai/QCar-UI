<template>
    <div class="page _____-page">
        <navbar></navbar>

        <div class="page-content d-flex align-items-stretch">
            <sidebar></sidebar>

            <div class="content-inner">
                <!-- Page Header-->
                <header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">_____</h2>
                </div>
                </header>
                <!-- Dashboard Counts Section-->
                <section class="dashboard-counts no-padding-bottom">
                    <div class="container-fluid">


                        <!--  -->


                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '@/components/parts/_navbar';
import sidebar from '@/components/parts/_sidebar';

export default {
    name: '_____',
    components: {
        navbar,
        sidebar
    },
    data () {
        return {

        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
