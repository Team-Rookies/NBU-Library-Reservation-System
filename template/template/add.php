<html>
    <body>
        <script type="text/javascript" src="components/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="components/underscore/underscore-min.js"></script>
        <script type="text/javascript" src="components/bootstrap3/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="components/jstimezonedetect/jstz.min.js"></script>
        <script type="text/javascript" src="js/language/bg-BG.js"></script>
        <script type="text/javascript" src="js/calendar.js"></script>
        <script type="text/javascript" src="js/models/event.js"></script>
        <script type="text/javascript" src="js/models/dateRange.js"></script>
        <script type="text/javascript" src="js/binaryTree.js"></script>
        <script type="text/javascript" src="js/calendarApp.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/models/event.js"></script>

        <?php
        if (empty($_POST)) {
            exit("Direct access not allowed");
        }

        $title = filter_input(INPUT_POST, 'title');
        $dateStart = filter_input(INPUT_POST, 'dateStart');
        $dateEnd = filter_input(INPUT_POST, 'dateEnd');
        $timeStart = filter_input(INPUT_POST, 'timeStart');
        $timeEnd = filter_input(INPUT_POST, 'timeEnd');
        ?>
        <script type="text/javascript">
            createEvent(
                    "<?php echo $title ?>",
                    "event-success",
                    new Date("<?php echo "$dateStart"."T"."$timeStart".":00+0200"?>"),
                    new Date("<?php echo "$dateStart"."T"."$timeStart".":00+0200"?>"),
                    "test.fake");
        </script>

    </body>
</html>

