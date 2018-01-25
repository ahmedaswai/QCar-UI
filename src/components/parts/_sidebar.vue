<template>
    <!-- Left Sidebar -->
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info">
            <!-- <div class="image">
                <img src="/static/images/user.png" width="48" height="48" alt="User" />
            </div> -->
            <div class="info-container">
                <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">إسم المستخدم</div>
                <!-- <div class="email">john.doe@example.com</div> -->
                <div class="btn-group user-helper-dropdown">
                    <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="javascript:void(0);"><i class="material-icons">input</i>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- #User Info -->
        <!-- Menu -->
        <div class="menu">
            <ul class="list">
                <li class="header">القائمة الرئيسية</li>
                <li>
                    <router-link :to="{path: '/dashboard'}">
                        <i class="material-icons">home</i>
                        <span>الرئيسية</span>
                    </router-link>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">people</i>
                        <span>إدارة المستخدمين</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <router-link :to="{path: '/users/all'}">بيانات المستخدمين</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">drive_eta</i>
                        <span>إدارة السائقين</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <router-link :to="{path: '/drivers/all'}">بيانات السائقين</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">attach_money</i>
                        <span>إدارة العملاء</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <router-link :to="{path: '/customers/all'}">بيانات العملاء</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- #Menu -->
    </aside>
    <!-- #END# Left Sidebar -->
</template>

<script>
export default {
    name: 'sidebar',
    data () {
        return {

        }
    },
    mounted(){
        //==========================================================================================================================

        /* DropdownMenu - Function =================================================================================================
        *  You can manage the dropdown menu
        *
        */

        $.AdminBSB.dropdownMenu = {
            activate: function () {
                var _this = this;

                $('.dropdown, .dropup, .btn-group').on({
                    "show.bs.dropdown": function () {
                        var dropdown = _this.dropdownEffect(this);
                        _this.dropdownEffectStart(dropdown, dropdown.effectIn);
                    },
                    "shown.bs.dropdown": function () {
                        var dropdown = _this.dropdownEffect(this);
                        if (dropdown.effectIn && dropdown.effectOut) {
                            _this.dropdownEffectEnd(dropdown, function () { });
                        }
                    },
                    "hide.bs.dropdown": function (e) {
                        var dropdown = _this.dropdownEffect(this);
                        if (dropdown.effectOut) {
                            e.preventDefault();
                            _this.dropdownEffectStart(dropdown, dropdown.effectOut);
                            _this.dropdownEffectEnd(dropdown, function () {
                                dropdown.dropdown.removeClass('open');
                            });
                        }
                    }
                });

                //Set Waves
                Waves.attach('.dropdown-menu li a', ['waves-block']);
                Waves.init();
            },
            dropdownEffect: function (target) {
                var effectIn = $.AdminBSB.options.dropdownMenu.effectIn, effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
                var dropdown = $(target), dropdownMenu = $('.dropdown-menu', target);

                if (dropdown.length > 0) {
                    var udEffectIn = dropdown.data('effect-in');
                    var udEffectOut = dropdown.data('effect-out');
                    if (udEffectIn !== undefined) { effectIn = udEffectIn; }
                    if (udEffectOut !== undefined) { effectOut = udEffectOut; }
                }

                return {
                    target: target,
                    dropdown: dropdown,
                    dropdownMenu: dropdownMenu,
                    effectIn: effectIn,
                    effectOut: effectOut
                };
            },
            dropdownEffectStart: function (data, effectToStart) {
                if (effectToStart) {
                    data.dropdown.addClass('dropdown-animating');
                    data.dropdownMenu.addClass('animated dropdown-animated');
                    data.dropdownMenu.addClass(effectToStart);
                }
            },
            dropdownEffectEnd: function (data, callback) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                data.dropdown.one(animationEnd, function () {
                    data.dropdown.removeClass('dropdown-animating');
                    data.dropdownMenu.removeClass('animated dropdown-animated');
                    data.dropdownMenu.removeClass(data.effectIn);
                    data.dropdownMenu.removeClass(data.effectOut);

                    if (typeof callback == 'function') {
                        callback();
                    }
                });
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
