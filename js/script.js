$(function () {

    // header 스크롤 시 bg, color 변경
    //윈도우 스크롤 시 실행
    $(window).scroll(function () {
        //스크롤이 800px 넘으면
        if ($(this).scrollTop() > 800) {
            //.scrolled 클래스 추가 
            $(".inner_header").addClass("scrolled");
        } else {
            //스크롤이 위로 올라가면 클래스 제거
            $(".inner_header").removeClass("scrolled");
        }
    });


    // header 스크롤 시 로고 변경
    $(window).scroll(function () {
        //스크롤이 800px 넘으면,
        if ($(this).scrollTop() > 800) {
            //.scrolled 클래스 추가
            $(".inner_header").addClass("scrolled");
            // 클래스명 .logo_img 이미지 src 경로 이미지 변경
            $(".logo_img").attr("src", "./images/LOGO_dark.svg");
            // 클래스명 .mypage_img 이미지 src 경로 이미지 변경
            $(".mypage_img").attr("src", "./images/util_mypage_dark.svg");
            // 클래스명 .lang_img 이미지 src 경로 이미지 변경
            $(".lang_img").attr("src", "./images/util_language_dark.svg");
            // 클래스명 .search_img 이미지 src 경로 이미지 변경
            $(".search_img").attr("src", "./images/util_search_dark.svg");
        } else {
            //스크롤이 위로 올라가면 클래스 제거
            $(".inner_header").removeClass("scrolled");
            // 클래스명 .logo_img 이미지 src 경로 이미지 변경
            $(".logo_img").attr("src", "./images/LOGO.svg");
            // 클래스명 .mypage_img 이미지 src 경로 이미지 변경
            $(".mypage_img").attr("src", "./images/util_mypage.svg");
            // 클래스명 .lang_img 이미지 src 경로 이미지 변경
            $(".lang_img").attr("src", "./images/util_language.svg");
            // 클래스명 .search_img 이미지 src 경로 이미지 변경
            $(".search_img").attr("src", "./images/util_search.svg");
        }
    });

    // 메인 배너

    //#banner visualSwiper 시작, 메인 배너 부분
    var swiper = new Swiper(".visualSwiper", {
        slidesPerView: 1, // 한 슬라이드에 보여줄 갯수
        spaceBetween: 0, // 슬라이드 사이 여백
        autoplay: {     //자동슬라이드 (false-비활성화)
            delay: 3000, // 시간 설정
            disableOnInteraction: false, // false-스와이프 후 자동 재생
        },
        effect: 'fade', // 페이드 효과 사용
        speed: 1500, // fade 효과의 전환 시간을 1000ms(1.5초)로 설정
        loop: true, // 슬라이드 반복 여부
        navigation: false, // 화살표 버튼 제거
        pagination: {
            el: "#visual .swiper-pagination",
            clickable: false,  // 불렛 버튼 클릭 여부
        }

    });


    // space tab
    $(function () {

        $(".tab_wrap").hide();

        // 초기에 active된 항목 읽어서 이미지 표시
        const initialIndex = $(".space li.active").index();
        $(".tab_wrap").hide().eq(initialIndex).show();

        $(".space li").click(function (e) {
            e.preventDefault();

            $(".space li").removeClass("active");
            $(this).addClass("active");

            const num = $(this).index();  // li 순서

            $(".tab_wrap").hide();
            $(".tab_wrap").eq(num).show();
        });
    });


    // 캘린더
    $(document).ready(function () {

        function filterPrograms($activeTab) {

            const selectedDateStr = $activeTab.data('date');
            if (!selectedDateStr) return;

            // 선택된 날짜를 정수형(YYYYMMDD)으로 변환하여 비교 준비
            const selectedDateInt = parseInt(selectedDateStr, 10);

            $('.quick li').hide(); // 모든 프로그램 숨김

            $('.quick li').each(function () {
                let $program = $(this);

                // 프로그램의 시작일과 종료일을 가져와 정수형으로 변환
                let startDateStr = $program.data('start');
                let endDateStr = $program.data('end');

                if (!startDateStr || !endDateStr) return; // 기간 정보가 없으면 건너뛰기

                const startDateInt = parseInt(startDateStr, 10);
                const endDateInt = parseInt(endDateStr, 10);

                let shouldShow = false;

                // 기간 비교: 선택된 날짜가 (시작일 >= 선택된 날짜) 그리고 (선택된 날짜 <= 종료일) 인지 확인
                if (selectedDateInt >= startDateInt && selectedDateInt <= endDateInt) {
                    shouldShow = true;
                }

                // 최종 결과 반영
                if (shouldShow) {
                    $program.show(); // 기간 내에 있으면 보이게 함
                }
            });
        }

        //.cal 내부의 모든 <a> 태그를 클릭했을 때 실행
        $('.cal li a').on('click', function (e) {
            e.preventDefault();

            // 탭 활성화 클래스 전환:
            // 클릭된 <a>의 부모 <li>에 'active' 클래스 추가
            $(this).parent().addClass('active').siblings().removeClass('active');

            // 필터링 함수 호출
            filterPrograms($(this));
        });

        // 페이지가 로드되자마자 실행되어, 초기 상태를 설정
        filterPrograms($('.cal li.active a'));
    });

    // 프로그램 흐르게
    $(function () {
        $(".regular").slick({
            infinite: true,      //무한반복
            slidesToShow: 6,
            slidesToScroll: 1,   //한번에 넘길 사진의 갯수(int)
            autoplay: true,      //자동시작
            cssEase: 'linear',   // 등속
            autoplaySpeed: 0,    //자동넘기기 시간(int, 1000ms = 1초)
            speed: 5000,         //모션 시간 (얼마나 빠른속도로 넘어가는지)(int, 1000ms = 1초)
            draggable: true,    //리스트 드래그 가능여부 (boolean) -default:true
            pauseOnFocus: false,
            pauseOnHover: false,  //마우스 포커스 시 슬라이드 멈춤 -default:true
            arrows: false,        //화살표(넘기기버튼) 여부 (boolean) -default:true
            dots: false,          //네비게이션버튼 (boolean) -default:false
        });

    });


    // 입점매장 로고
    $(document).ready(function () {
        const itemHeight = 200; // 아이템 하나의 실제 높이 (이미지 165px + 마진 35px)
        const visibleItems = 5; // 화면에 보이는 아이템 수
        const scrollSpeed = 2500;  // 애니메이션 속도 (숫자가 클수록 느려집니다. 4000 = 4초)

        // 아래에서 위로 스크롤
        function autoScrollUp() {
            // 'scroll-up' 클래스를 가진 모든 컨테이너에 대해 작동
            $('.store_boxs.scroll-up').each(function () {
                // .store_box가 두 개 있지만, 첫 번째 .store_box가 실제 스크롤 대상
                let $storeBox = $(this).find('.store_box').first();

                // 애니메이션 실행: 아이템 하나 높이만큼 위로 이동
                $storeBox.animate({
                    marginTop: -itemHeight // -200px 만큼 위로 이동
                }, scrollSpeed, 'linear', function () {
                    // 애니메이션 완료 후: 맨 위의 로고를 잘라 맨 뒤에 붙이기
                    // (첫 번째 .logo 요소를 선택)
                    let $firstLogo = $storeBox.find('.logo').first();
                    $storeBox.append($firstLogo);

                    // 마진을 초기화하여 원래 위치로 즉시 점프 (시각적 끊김 없음)
                    $storeBox.css('margin-top', 0);

                    // 재귀적으로 함수를 다시 호출하여 무한 반복
                    autoScrollUp();
                });
            });
        }


        // 위에서 아래로 스크롤
        function autoScrollDown() {
            // 'scroll-down' 클래스를 가진 모든 컨테이너에 대해 작동
            $('.store_boxs.scroll-down').each(function () {
                let $storeBox = $(this).find('.store_box').first();

                // 초기 위치 설정 (첫 실행 시, 맨 아래 로고를 맨 위로 보내야 함)
                if ($storeBox.css('margin-top') === '0px') {
                    // 맨 마지막 로고를 선택하여 맨 앞에 붙임 (한 칸 아래로 스크롤할 준비)
                    let $lastLogo = $storeBox.find('.logo').last();
                    $storeBox.prepend($lastLogo);

                    // 마진을 -1칸 높이로 설정하여, 맨 위에 붙인 로고가 컨테이너 밖으로 나가게 함
                    $storeBox.css('margin-top', -itemHeight); // -200px
                }

                // 애니메이션 실행: 아이템 하나 높이만큼 아래로 이동 (마진 0으로)
                $storeBox.animate({
                    marginTop: 0 // 아래로 200px 이동
                }, scrollSpeed, 'linear', function () {
                    // 애니메이션 완료 후: 재귀적으로 함수를 다시 호출하여 무한 반복
                    autoScrollDown();
                });
            });
        }
        // 스크롤 시작
        autoScrollUp();
        autoScrollDown();
    });


    // 입점매장 숫자
    // .counter 클래스에서 카운터 애니메이션 적용
    $('.num').counterUp({
        // 숫자 증가 속도 설정
        // 10ms마다 숫자 증가
        delay: 10,
        //숫자가 완전히 증가하는 시간 설정 1000ms=1초
        time: 1000
    });


});

// 리뷰
var swiper = new Swiper(".reviewSwiper", {
    slidesPerView: 4, // 한 슬라이드에 보여줄 갯수
    spaceBetween: 40,  // 슬라이드 사이 여백
    centeredSlides: false,
    autoplay: { // 자동 슬라이드 설정 , 비 활성화 시 false
        delay: 1500, // 시간 설정
        disableOnInteraction: false, // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
    },
    loop: true, // 슬라이드 반복 여부

    pagination: {
        el: ".swiper-pagination",
        clickable: true, // 불릿버튼 클릭 여부
    },
    navigation: {  // 화살표 버튼
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// 파트너
const ANIMATION_SPEED = 0.8;
const LOGO_MARGIN_RIGHT = 80;

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.partner_track');
    const initialList = track.querySelector('.partner');

    if (!track || !initialList) return;

    // 여백 설정 및 초기 너비 계산
    const applyMargin = (list) => {
        list.querySelectorAll('li').forEach(li => {
            li.style.marginRight = `${LOGO_MARGIN_RIGHT}px`;
        });
    };
    applyMargin(initialList);

    let currentX = 0;
    let isPaused = false;

    function runMarquee() {
        if (!isPaused) {
            // 한 리스트의 실제 너비
            const listWidth = initialList.getBoundingClientRect().width;

            currentX -= ANIMATION_SPEED;

            // 한 세트가 완전히 지나가면 초기화
            if (Math.abs(currentX) >= listWidth) {
                currentX = 0;
            }

            track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        }
        requestAnimationFrame(runMarquee);
    }

    // 이미지 로드 대기 후 시작
    window.addEventListener('load', () => {
        requestAnimationFrame(runMarquee);
    });
});


// 부드럽게 스크롤
$(document).ready(function () {
    // .gnb 요소 내부에 있는, href 속성 값이 '#'으로 시작하는 모든 <a> 태그 선택
    $('.gnb a[href^="#"]').on('click', function (e) {

        // 기본 링크 이동 동작 방지
        e.preventDefault();

        // 클릭된 링크의 href 값 가져옴
        const targetId = $(this).attr('href');

        // 목표 요소가 실제로 존재하는지 확인
        if ($(targetId).length) {

            // 목표 요소의 문서 상단으로부터의 위치(Y 좌표)를 계산합니다.
            const headerHeight = 90; // 고정헤더 높이
            const targetPosition = $(targetId).offset().top - headerHeight;

            // HTML과 BODY 대상으로 스크롤 실행
            $('html, body').animate({
                // 계산된 위치로 스크롤 이동
                scrollTop: targetPosition
            },
                // 애니메이션 지속 시간 ms
                700
            );
        }
    });
});


// top 버튼
$(function () {
    //맨 위로 부드럽게 이동
    //.topBtn을 클릭하면
    $(".topBtn").click(function () {
        //html, body에게 애니메이션을 준다
        $("html,body").animate({
            //스크롤 세로 위치가 0
            scrollTop: '0'
            //1초 동안
        }, 1000);
    });

    //일정구간부터 버튼 나타나게 하기
    //.topBtn을 숨긴다
    $(".topBtn").hide();
    //스크롤하면
    $(window).scroll(function () {
        //1000보다 크면 보이고, 1000보다 작으면 사라진다
        if ($(this).scrollTop() > 1000) {
            $(".topBtn").fadeIn()
        } else {
            $(".topBtn").fadeOut()
        }
    });
});