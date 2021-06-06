<?php

shell_exec("{$_ENV['DOCUMENT_ROOT']}\setup.sh");
header("Refresh:0");
exit;