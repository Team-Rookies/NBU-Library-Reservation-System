<html>
    <body>
        <script type="text/javascript" src="components/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="js/calendar.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/models/event.js"></script>

        <?php
        if (empty($_POST)) {
            exit("Direct access not allowed");
        }

        $title = filter_input(INPUT_POST, 'title');
        $dep = filter_input(INPUT_POST, 'dep');
        $additionalInfo = filter_input(INPUT_POST, 'additionalInfo');
        $username = filter_input(INPUT_POST, 'username');
        $phone = filter_input(INPUT_POST, 'phone');
        $mail = filter_input(INPUT_POST, 'mail');
        $dateStart = filter_input(INPUT_POST, 'dateStart');
        $dateEnd = filter_input(INPUT_POST, 'dateEnd');
        $timeStart = filter_input(INPUT_POST, 'timeStart');
        $timeEnd = filter_input(INPUT_POST, 'timeEnd');
        $repeatMethod =  filter_input(INPUT_POST, 'selectMethod');
        if (isset($_POST['selectDuration'])){
        $repeatDuration= filter_input(INPUT_POST, 'selectDuration');
        } else {
        $repeatDuration = 0; }
        ?>
       
         <script type="text/javascript">
            createEvent(
                    "<?php echo $title ?>",
                    "<?php echo $dep ?>",
                    <?php if (isset($_POST['multimedia'])) 
                    { echo "true"; } 
                    else 
                    { echo "false"; } ?>,
                    "<?php echo $additionalInfo ?>",
                    "<?php echo $username ?>",
                    "<?php echo $phone ?>",
                    "<?php echo $mail ?>",
                    "event-success",
                    new Date("<?php echo "$dateStart" . "T" . "$timeStart" . ":00+0200" ?>"),
                    new Date("<?php echo "$dateEnd" . "T" . "$timeEnd" . ":00+0200" ?>"),
                    "<?php echo $repeatMethod ?>",
                    <?php echo $repeatDuration ?>
                    );
             </script>   

    </body>
</html>

